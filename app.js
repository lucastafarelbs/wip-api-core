require('dotenv').config()
const Server = require('./server/server.js')
const Path = require('path')

const init = async () => {
  try {
    const projectName = process.env.PROJECT_NAME || 'api-core'
    const host = process.env.SERVER_HOST || '0.0.0.0'
    const port = process.env.SERVER_PORT || 3000
    const routesPrefix = process.env.SERVER_API_VERSION || '/api/v1'
    const displayRoutes = process.env.DISPLAY_ROUTES || false
    const routesPath = Path.join(__dirname, 'src')

    const serverConfigs = {
      projectName,
      host,
      port,
      routesPath,
      routesPrefix,
      displayRoutes
    }

    const serverInstance = await Server.start(serverConfigs)
    console.log(`Hello, ${projectName} listening at ${serverInstance}`)
  } catch (err) {
    console.log('ERROR: ', err)
  }
}

init()
