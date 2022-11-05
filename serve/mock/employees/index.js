// 使用 Mock
const Mock = require('mockjs')

/**
 * 创建一份公司员工数据
 */
function createEmData() {
  return Mock.mock({
    "data|30-50": [
      {
        "name": "@name",
        "email": "@email",
        "city": "@city",
        "color": "@rgba",
        "time": "@datetime",
        "level|1-10": "★"
      }
    ]
  })
}

module.exports = createEmData