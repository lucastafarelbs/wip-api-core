require('dotenv').config()
const Server = require('./server/server.js')
const Path = require('path')
const MongoDb = require('./db/mongodb')

const {
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  SERVER_API_VERSION,
  DISPLAY_ROUTES,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const connectToMongoDB = async databaseConfigs => {
  try {
    const { username, password, host, port, name } = databaseConfigs
    if (!host || !port || !name) {
      const error = new Error('Please fill database configurations in .env file.')
      return Promise.reject(error)
    }

    const dbURL = (username && password)
      ? `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`
      : `mongodb://${host}:${port}/${name}`
    const dbConnection = await MongoDb.createConnection(dbURL)
    return Promise.resolve(dbConnection)
  } catch (error) {
    return Promise.reject(error)
  }
}

const init = async () => {
  try {
    const projectName = PROJECT_NAME || 'api-core'
    const databaseConfigs = {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      host: DB_HOST || '127.0.0.1',
      port: DB_PORT || '27017',
      name: DB_NAME || projectName
    }
    const dbConnection = await connectToMongoDB(databaseConfigs)
    console.log(`Database is connected on ${dbConnection.host}:${dbConnection.port}`)

    const serverConfigs = {
      host: SERVER_HOST || '0.0.0.0',
      port: SERVER_PORT || 3000,
      routesPrefix: SERVER_API_VERSION || '/api/v1',
      displayRoutes: DISPLAY_ROUTES || false,
      routesPath: Path.join(__dirname, 'domains'),
      serverTimeout: 5000,
      dbConnection
    }

    const serverInstance = await Server.start(serverConfigs)
    console.log(`Hello, ${projectName} listening at ${serverInstance}`)
  } catch (err) {
    console.log('Oops, check this error before continue:')
    console.log(err)
  }
}

init()
