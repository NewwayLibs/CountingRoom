const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('build/api-server/db.json')
const middlewares = jsonServer.defaults()
const utils = require('./utils.js')
console.log('utils', utils)

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Expose-Headers', 'Authorization')
  res.header('Access-Control-Request-Headers', 'Authorization')
  res.header('Access-Control-Request-Method', 'GET, POST, OPTIONS, PUT')
  next()
})

server.use((req, res, next) => {
  if (utils.isAuthorized(req)) { // add your authorization logic here
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
})

server.post('/auth/login', (req, res) => {
  res.header('Authorization', 'Bearer CustomToken')
  res.jsonp({
    status: 'success'
  })
})

server.get('/auth/refresh', (req, res) => {
  res.header('Authorization', 'Bearer CustomToken')
  res.jsonp({
    status: 'success'
  })
})

server.get('/auth/user', (req, res) => {
  res.jsonp({
    'id': 1,
    'profile_id': 2,
    'currency_id': 1,
    'email': 'bilyk.a@novadumka.com',
    'password': 'bilyk.a',
    'fullname': 'Bilyk Andrii',
    'status': true
  })
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
