/*
 * @Author: BORING GHOST
 * @Date: 2022-05-03 14:31:54
 * @LastEditTime: 2022-05-03 15:20:27
 * @Description: 权限设置
 */
const express = require('express')
const permission = express.Router()
const fs = require('fs')
const path = require('path')

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './data.txt'), 'utf-8', function (err, fileData) {
      if (err) return reject('读取文件失败');
      resolve(JSON.parse(fileData))
    })
  })
}

function writeFile(fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, './data.txt'), JSON.stringify(fileData), function (err) {
      if (err) return reject('写入失败');
      resolve('写入成功')
    })
  })
}
function hasKeys(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
  let keys = Object.keys(obj)
  for (const item of ['user', 'password', 'roles']) {
    if (!keys.includes(item)) return false;
  }
  if (!(obj['roles'] instanceof Array)) return false;
  return true;
}
/**
 * 获取权限信息
 */
permission.get('/permission/get', function (req, res) {
  readFile().then(response => {
    res.status(200).send(response)
  }).catch(e => res.status(500).send(e))
})
/**
 * 新增权限信息
 */
permission.post('/permission/add', function (req, res) {
  let obj = req.body
  // TODO :有时候roles会变成字符串
  if (typeof obj.roles === 'string') obj.roles = JSON.parse(obj.roles);
  if (!hasKeys(obj)) return res.status(500).send('参数不正确');
  readFile().then(response => {
    writeFile([
      ...response,
      {
        id: response.length + '-0',
        user: obj.user,
        password: obj.password,
        roles: obj.roles
      }
    ]).then(() => {
      res.status(200).send('添加成功')
    }).catch(e => res.status(500).send(e))
  }).catch(e => res.status(500).send(e))
})
/**
 * 修改权限信息
 */
permission.post('/permission/set', function (req, res) {
  let obj = req.body
  if (!obj.id) return res.status(500).send('没有id怎么行');
  if (obj.id === '0-0') return res.status(500).send('禁止对最高权限id操作');
  // TODO :有时候roles会变成字符串
  if (typeof obj.roles === 'string') obj.roles = JSON.parse(obj.roles);
  if (!hasKeys(obj)) res.status(500).send('参数不对');
  readFile().then(response => {
    let index = response.findIndex(item => item.id === obj.id)
    if (index === -1) return res.status(200).send('没有此id');
    response.splice(index, 1, {
      id: obj.id,
      user: obj.user,
      password: obj.password,
      roles: obj.roles
    })
    writeFile(response).then(() => res.status(200).send('修改成功')).catch(e => res.status(500).send(e))
  }).catch(e => res.status(500).send(e))
})
/**
 * 删除权限信息
 */
permission.post('/permission/del', function (req, res) {
  if (!req.body.id) return res.status(500).send('没有id怎么行');
  if (req.body.id === '0-0') return res.status(500).send('禁止对最高权限id操作');
  readFile().then(response => {
    let index = response.findIndex(item => item.id === req.body.id);
    if (index === -1) return res.status(200).send('没有此id');
    response.splice(index, 1)
    writeFile(response).then(() => res.status(200).send('删除成功')).catch(e => res.status(500).send(e))
  }).catch(e => res.status(500).send(e))
})
module.exports = permission