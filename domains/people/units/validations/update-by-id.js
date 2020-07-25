const Joi = require('@hapi/joi')

const { validRoles } = require('../../configs')

const body = Joi.object().keys({
  role: Joi.string().valid(...validRoles).required()
}).required()

module.exports = {
  body
}
