const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('build/api-server/db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/response401', (req, res) => {
  res.jsonp(req.query)
})

server.post('/echo', (req, res) => {
  console.log('POST', req)
  res.jsonp(req.query)
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
