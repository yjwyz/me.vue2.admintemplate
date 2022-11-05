/*
 * @Author: BORING GHOST
 * @Date: 2022-05-03 12:35:56
 * @LastEditTime: 2022-05-03 14:26:11
 * @Description: 公司设置
 */
const express = require('express')
const company = express.Router()
const fs = require('fs')
const path = require('path')

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './data.txt'), 'utf-8', function (err, fileData) {
      if (err) return reject(err);
      resolve(JSON.parse(fileData))
    })
  })
}

function writeFile(writeData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, './data.txt'), JSON.stringify(writeData), function (err) {
      if (err) return reject(err);
      resolve('写入成功')
    })
  })
}
function hasKeys(obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return false;
  let keys = Object.keys(obj);
  for (const item of ['names', 'job']) {
    if (!keys.includes(item)) return false;
  }
  if (!(obj['names'] instanceof Array)) return false;
  return true;
}
/**
 * 查看职务
 */
company.get('/company/get', function (req, res) {
  readFile().then(response => {
    res.status(200).send(response)
  })
})
/**
 * 添加职务
 */
company.post('/company/add', function (req, res) {
  let obj = req.body
  obj.names = JSON.parse(obj?.names) // TODO : 有时传入的数组是个字符
  if (!hasKeys(obj)) return res.status(400).send('参数不对');
  readFile().then(response => {
    writeFile([
      ...response,
      {
        id: response.length + '-0',
        job: obj.job,
        names: obj.names
      }
    ]).then(write_res => {
      res.status(200).send(write_res)
    }).catch(e => res.status(500).send(e))
  }).catch(e => res.status(500).send(e))
})
/**
 * 删除职务
 */
company.post('/company/del', function (req, res) {
  let id = req.body.id
  if (!id) return res.status(500).send('请传入id');
  readFile().then(response => {
    let index = response.findIndex(v => v.id === id)
    if (index === -1) return res.status(200).send('没有此id');
    response.splice(index, 1)
    writeFile(response).then(() => {
      res.status(200).send('删除成功')
    }).catch(e => res.status(500).send(e))
  }).catch(e => res.status(500).send(e))
})
/**
 * 修改职务
 */
company.post('/company/set', function (req, res) {
  let obj = req.body
  if (!obj.id) return res.status(500).send('请传入id');
  obj.names = JSON.parse(obj?.names) // TODO : 有时传入的数组是个字符
  if (!hasKeys(obj)) return res.status(500).send('缺少参数');
  readFile().then(response => {
    let index = response.findIndex(item => item.id === obj.id)
    if (index === -1) return res.status(200).send('没有此id');
    response.splice(index, 1, {
      id: obj.id,
      job: obj.job,
      names: obj.names
    })
    writeFile(response).then(() => {
      res.status(200).send('修改成功')
    }).catch(e => res.status(500).send(e))
  }).catch(e => res.status(500).send(e))
})
module.exports = company