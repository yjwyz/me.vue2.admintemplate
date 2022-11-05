/*
 * @Author: BORING GHOST
 * @Date: 2022-05-01 09:29:53
 * @LastEditTime: 2022-05-02 16:00:29
 * @Description: 组织架构
 */
const express = require('express')
const fs = require('fs')
const path = require('path')
let data = []

const architecture = express.Router()
function readF() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './data/architecture.json'), 'utf-8', function (err, str_data) {
      if (err) return console.log('数据读取失败');
      resolve(str_data)
    })
  })
}
function writF(fileData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, './data/architecture.json'), fileData, function (err) {
      if (err) return console.log('写入失败');
      resolve("写入成功")
    })
  })
}
readF().then(res => {
  data = res
})
/**
 * 获取组织架构的数据
 */
architecture.get('/architecture/tree', function (req, res) {
  setTimeout(() => {
    readF().then(v => {
      res.send(v)
    })
  }, 500); // TODO :特意延迟3秒
})

/**
 * 新增部门
 */
architecture.post('/architecture/addBumen', function (req, res) {
  let new_data = JSON.parse(data)
  new_data['depts'].push({
    "id": new_data['depts'].length + '-0',
    "pid": "",
    "companyId": "1",
    "name": req.body.name,
    "code": null,
    "managerId": null,
    "manager": null,
    "introduce": null,
    "createTime": null,
    "icon": req.body.icon
  })
  data = JSON.stringify(new_data)
  writF(data).then(v => {
    res.status(200).send(v)
  })
})
/**
 * 查看某个id信息
 */
architecture.get('/architecture/lookTheIdInfo', function (req, res) {
  if (!req.query.id) return res.status(500).send('没用的id');
  writF(data).then(v => {
    let new_data = JSON.parse(data)
    let result = new_data['depts'].find(item => item.id === req.query.id)
    res.status(200).send(result)
  })
})
/**
 * 删除某个角色
 */
architecture.post('/architecture/delRole', function (req, res) {
  if (!req.body.id) return res.status(400).send('请传入id');
  let new_data = JSON.parse(data)
  let index = new_data['depts'].findIndex(item => item.id == req.body.id)
  if (index === -1) return res.status(200).send('没有此id');
  new_data['depts'].splice(index, 1)
  data = JSON.stringify(new_data)
  writF(data).then(v => {
    res.status(200).send('删除成功')
  })
})
/**
 * 新增角色
 */
architecture.post('/architecture/addRoles', function (req, res) {
  let new_data = JSON.parse(data)
  new_data['depts'].push({
    "id": new_data['depts'].length + '-0',
    "pid": req.body.pid,
    "companyId": "1",
    "name": req.body.name,
    "code": null,
    "managerId": null,
    "manager": req.body.manager,
    "introduce": null,
    "createTime": null,
    "icon": req.body.icon
  })
  data = JSON.stringify(new_data)
  writF(data).then(v => {
    res.status(200).send(v)
  })
})
module.exports = architecture