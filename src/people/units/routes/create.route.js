'use strict'
const Path = require('path')
const thisUnit = Path.dirname(Path.dirname(Path.dirname(__filename))).split(Path.sep).pop()
const thisRoute = Path.basename(__filename).split('.')[0]
const handlers = require('../handlers')

const pathToValidation = Path.join(__dirname, '..', '..', 'domains', 'validations', `${thisRoute}`)

const validations = require(pathToValidation)

const route = {
  method: 'post',
  path: `/${thisUnit}`,
  name: `${thisUnit}:${thisRoute}`,
  handler: handlers.create,
  validate: validations,
  config: {
    needAuth: true
  }
}

module.exports = route
