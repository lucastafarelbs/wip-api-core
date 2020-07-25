const fastify = require('fastify')
const fastifyServerTimeout = require('fastify-server-timeout')
const registerRoutesByPath = require('./routes-manager/register-routes-by-path.js')

const start = async serverConfigs => {
  if (!serverConfigs) return Promise.reject(new Error('Fill serverConfigs object.'))
  if (!serverConfigs.routesPath) return Promise.reject(new Error('The property routesPath is required on serverConfigs.'))

  const host = serverConfigs.host
  const port = serverConfigs.port
  const displayRoutes = serverConfigs.displayRoutes
  const routesPrefix = serverConfigs.routesPrefix
  const routesPath = serverConfigs.routesPath
  const serverTimeout = serverConfigs.serverTimeout
  const dbConnection = serverConfigs.dbConnection

  const server = fastify({
    logger: false
  })

  if (dbConnection) {
    server.decorate('dbConnection', dbConnection)
  }

  server.setErrorHandler(require('./handlers/validation-error'))
  server.register(fastifyServerTimeout, { serverTimeout })

  registerRoutesByPath(server, { displayRoutes, routesPrefix, routesPath })

  return server.listen(port, host)
}

module.exports = { start }
