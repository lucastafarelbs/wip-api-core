const { isArray } = require('lodash')
const LoadRoutesByPath = require('./load-routes-by-path.js')
const preHandlers = require('../pre-handlers')

const getRouteConfigPreHandlers = preHandler => {
  if (!preHandler) return []
  if (typeof preHandler === 'function') return [preHandler]
  if (isArray(preHandler)) return preHandler
  return null
}

const registerRoutesByPath = (server, configs) => {
  const { displayRoutes, routesPrefix, routesPath } = configs

  const routes = LoadRoutesByPath(routesPath)

  const registeredRoutes = routes.map(route => {
    const { method, handler, validate, config, preHandler, name } = route
    const url = routesPrefix + route.path
    const authenticationPreHandler = (config && config.needAuth) ? [preHandlers.authentication] : []
    const routeConfigPreHandlers = getRouteConfigPreHandlers(preHandler)
    if (!routeConfigPreHandlers) throw new Error(`preHandler malformed, please check route declaration for: ${name}`)
    const routePreHandlers = [...authenticationPreHandler, ...routeConfigPreHandlers]

    const routeFullDeclaration = {
      method: method.toUpperCase(),
      url: url,
      preHandler: routePreHandlers,
      handler,
      config,
      schema: validate,
      schemaCompiler: schema => data => {
        // console.log(data)
        // console.log(schema)
        const sanitizedSchema = (typeof schema === 'function') ? schema(data) : schema
        // console.log(sanitizedSchema)
        return sanitizedSchema.validate(data, { abortEarly: false })
      }
    }

    server.route(routeFullDeclaration)
    return { ...routeFullDeclaration, ...route }
  })

  if (displayRoutes.toString().toLowerCase() === 'true') {
    const displayRegisteredRoutes = require('./display-registered-routes.js')
    displayRegisteredRoutes(registeredRoutes)
  }
}

module.exports = registerRoutesByPath
