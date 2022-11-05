const express = require('express')
const employess = express.Router()
const fs = require('fs')
const path = require('path')
// const createEmData = require('../../mock/employees/index.js')

// function addId({ data }) {
//   let result = []
//   for (let k = 0, len = data.length; k < len; k++) {
//     result[k] = data[k]
//     result[k]['id'] = k + '-0'
//   }
//   return result
// }

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './data.txt'), 'utf-8', function (err, str_data) {
      resolve(JSON.parse(str_data))
    })
  })
}

function writeFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, './data.txt'), JSON.stringify(data), function (err) {
      if (!err) return resolve('写入成功');
      reject('写入失败')
    })
  })
}

/**
 * 添加人物必须传入这些参数
 */
function hasKeys(obj) {
  let keys = Object.keys(obj)
  let requred = ["name", "email", "city", "color", "time", "level"]
  for (let k = 0, len = requred.length; k < len; k++) {
    if (!keys.includes(requred[k])) return false;
  }
  return true
}

/**
 * 公司所有员工信息
 */
employess.get('/employees/list', function (req, res) {
  readFile().then(response => {
    res.status(200).send(response)
  }).catch(e => res.status(400).send(e))
})

/**
 * 查找某个人物信息
 */
employess.get('/employees/look', function (req, res) {
  if (!req.query.id) return res.status(400).send('请传入id');
  readFile().then(response => {
    let result = response.find(item => item.id === req.query.id)
    res.status(200).send(result)
  }).catch(e => res.status(400).send(e))
})

/**
 * 添加某个人物信息
 */
employess.post('/employees/add', function (req, res) {
  if (!hasKeys(req.body)) return res.status(400).send('缺少参数');
  readFile().then(response => {
    response.push({
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      color: req.body.color,
      time: req.body.time,
      level: req.body.level,
      id: response.length + '-0'
    })
    writeFile(response).then(res_ => {
      res.status(200).send(res_)
    }).catch(e => res.status(400).send(e))
  }).catch(e => res.status(400).send(e))
})
/**
 * 删除某个人物信息
 */

employess.post('/employees/del', function (req, res) {
  if (!req.body.id) return res.status(400).send('缺少参数');
  readFile().then(response => {
    let new_res = response
    let index = new_res.findIndex(item => item.id == req.body.id);// TODO:使用双等
    if (index === -1) return res.status(200).send(`没有id为${req.body.id}这个人物`);
    new_res.splice(index, 1)
    writeFile(new_res).then(res_ => {
      res.status(200).send('删除成功!')
    }).catch(e => res.status(400).send(e))
  }).catch(e => res.status(400).send(e))
})

module.exports = employess