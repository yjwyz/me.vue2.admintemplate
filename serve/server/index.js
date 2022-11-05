const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//防止跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  if (req.method.toLowerCase() == 'options') {
    res.send(200); //让options尝试请求快速结束
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

function openServe(port_ = 8080) {
  const serve = app.listen(port_, function () {
    let host = serve.address().address
    let port = serve.address().port
    host = host === '::' ? '127.0.0.1' : host;
    console.log('服务开启成功:http://%s:%s', host, port);
  })
}

module.exports = {
  app,
  openServe
}