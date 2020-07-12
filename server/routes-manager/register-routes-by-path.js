const { pick } = require('lodash')
const LoadRoutesByPath = require('./load-routes-by-path.js')

const registerRoutesByPath = (server, dirName, routesPrefix, displayRoutes = false) => {
  const routes = LoadRoutesByPath(dirName)

  routes.forEach(route => {
    const { method, handler } = route

    route.path = routesPrefix + route.path
    const opts = pick(route, ['path', 'name', 'version', 'validate', 'needAuth'])
    server[method](route.path, opts, handler)
  })

  if (displayRoutes) {
    const displayRegisteredRoutes = require('./display-registered-routes.js')
    displayRegisteredRoutes(routes)
  }
}

module.exports = registerRoutesByPath
