/*
 * @Author: BORING GHOST
 * @Date: 2022-04-30 16:08:51
 * @LastEditTime: 2022-05-01 11:35:05
 * @Description: 
 */

const express = require('express')
const user = express.Router()
const token = "asdfhwkjaerhkahkjasfbhsdafbaskdbf"
/**
 * 用户登录
 */
user.get('/user/login', function (req, res) {
  res.send({
    code: 200,
    token
  })
})
/**
 * 获取用户信息
 * 返回个人信息与路由权限
 */
user.post('/user/userInfo', function (req, res) {
  if (req.query.token !== token) return res.status(400).send('token无效');
  res.send({
    code: 200,
    roles: ['Boring ghost'],
    introduction: 'I am Boring ghost',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Boring ghost'
  })
})

module.exports = user

