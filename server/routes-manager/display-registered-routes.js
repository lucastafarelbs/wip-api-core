const { table } = require('table')
const head = [
  'method',
  'url',
  'name',
  'authenticate'
]

const routeToRow = route => {
  const { method, url, name, needAuth } = route
  const authenticate = needAuth || false
  return ([method, url, name, authenticate])
}

const parseRoutesToRows = routes => {
  const rows = routes.map(routeToRow)
  return [head, ...rows]
}

const displayRegisteredRoutes = routes => {
  const rows = parseRoutesToRows(routes)

  console.log(table(rows))
}

module.exports = displayRegisteredRoutes
