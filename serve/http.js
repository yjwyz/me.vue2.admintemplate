const { openServe, app } = require('./server/index.js');

const routes = [
  require('./router/user.js'),
  require('./router/architecture/architecture.js'),
  require('./router/employees/index.js'),
  require('./router/company/index.js'),
  require('./router/permission/index.js')
]

for (let k = 0, len = routes.length; k < len; k++) {
  app.use(routes[k])
}
openServe()