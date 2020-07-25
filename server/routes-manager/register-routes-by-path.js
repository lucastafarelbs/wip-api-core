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
    const { method, handler, validate, needAuth, preHandler, name } = route
    const url = routesPrefix + route.path
    const authenticationPreHandler = needAuth ? [preHandlers.authentication] : []
    const routeConfigPreHandlers = getRouteConfigPreHandlers(preHandler)
    if (!routeConfigPreHandlers) throw new Error(`preHandler malformed, please check route declaration for: ${name}`)
    const routePreHandlers = [...authenticationPreHandler, ...routeConfigPreHandlers]

    const routeFullDeclaration = {
      method: method.toUpperCase(),
      url: url,
      preHandler: routePreHandlers,
      handler,
      schema: validate,
      schemaCompiler: schema => (data) => {
        data = data || {}
        const joiOptions = {
          abortEarly: false, // return all errors
          convert: true, // change data type of data to match type keyword
          allowUnknown: false, // remove additional properties
          noDefaults: false
        }

        const validationSchema = (typeof schema === 'function')
          ? schema(data)
          : schema

        const result = validationSchema.validate(data, joiOptions)
        if (!result.error) return { value: result }

        return { error: { ...result.error } }
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
