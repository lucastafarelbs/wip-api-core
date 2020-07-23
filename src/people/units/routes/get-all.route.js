'use strict'
const Path = require('path')
const Fs = require('fs')
const thisUnit = Path.dirname(Path.dirname(Path.dirname(__filename))).split(Path.sep).pop()
const thisRoute = Path.basename(__filename).split('.')[0]
const thisHandler = require('../handlers')

const pathToValidation = `../../../domains/${thisUnit}/validations/${thisRoute}.validations.js`
const validations = Fs.existsSync(Path.join(__dirname, pathToValidation))
  ? require(pathToValidation)
  : {}

const route = {
  method: 'get',
  path: `/${thisUnit}`,
  name: `${thisUnit}:${thisRoute}`,
  preHandler: null,
  handler: thisHandler.getAll,
  validate: validations,
  config: {
    needAuth: true
  }
}

module.exports = route
