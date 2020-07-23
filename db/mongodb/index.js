const Mongoose = require('mongoose')

const mongoConnectionOptions = {
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: false
}

const createConnection = (uri) => {
  return Mongoose.createConnection(uri, mongoConnectionOptions)
}

module.exports = { createConnection }
