const Joi = require('@hapi/joi')

const querystring = Joi.object().keys({
  limit: Joi.number().min(10).max(100).required(),
  start: Joi.number().min(1).required()
}).required()

module.exports = { querystring }
