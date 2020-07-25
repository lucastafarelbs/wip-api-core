const Joi = require('@hapi/joi')

const { validRoles } = require('../../configs')

const body = ({ role }) => Joi.object().keys({
  name: Joi.string().required(),
  role: Joi.any().valid(...validRoles).required(),
  // person: Joi.string(),
  // phones: Joi.array().items(
  //   Joi.object().keys({
  //     type: Joi.string(),
  //     description: Joi.string(),
  //     number: Joi.string()
  //   })
  // ),
  // email: Joi.array().items(
  //   Joi.object().keys({
  //     mail: Joi.string(),
  //     description: Joi.string()
  //   })
  // ),
  ...rolesValidation[role]
}).required()

const rolesValidation = {
  company: {
    cnpj: Joi.string().required(),
    ie: Joi.string(),
    job: Joi.string(),
    representative: Joi.string(),
    fantasyname: Joi.string()
  }
}

module.exports = { body }
