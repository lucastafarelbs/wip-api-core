const fastify = require('fastify')
const fp = require('fastify-plugin')
const registerRoutesByPath = require('./routes-manager/register-routes-by-path.js')

const createServer = serverConfigs => {
  const server = fastify({ logger: false })
  // server.register(require('./database.js'))
  // server.register(require('./route.js'))
  const { routesPath, routesPrefix, displayRoutes } = serverConfigs

  const registerRoutes = (instance, options, next) => {
    registerRoutesByPath(instance, routesPath, routesPrefix, displayRoutes)
    next()
  }

  const ffpp = fp(registerRoutes, {
    fastify: '>=1.0.0',
    name: 'fastify-register-routes'
  })
  server.register(ffpp)
  return server
}

const start = async serverConfigs => {
  if (!serverConfigs) return Promise.reject(new Error('Fill serverConfigs object.'))
  if (!serverConfigs.routesPath) return Promise.reject(new Error('The property routesPath is required on serverConfigs.'))

  const host = serverConfigs.host
  const port = serverConfigs.port
  const displayRoutes = serverConfigs.displayRoutes
  const routesPrefix = serverConfigs.routesPrefix
  const routesPath = serverConfigs.routesPath

  if (!routesPath) return console.log('routesPath is required')
  const serverInstance = createServer({
    displayRoutes,
    routesPrefix,
    routesPath
  })
  serverInstance.ready().then(() => console.log(serverInstance.printRoutes()))
  return serverInstance.listen(port, host)
}

module.exports = { start }
