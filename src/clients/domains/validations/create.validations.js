const Joi = require('joi')

const validRoles = ['client', 'company']

const body = (role) => Joi.object().keys({
    name: Joi.string()
  ,	role: Joi.string().valid(validRoles).required()
  , person: Joi.string()
  , phones: Joi.array().items(
			Joi.object().keys({
          type: Joi.string()
				,	description: Joi.string()
				, number: Joi.string()
			})
		)
  , email: Joi.array().items(
    Joi.object().keys({
      mail: Joi.string()
      , description: Joi.string()
    })
  )
  , ...rolesValidation[role]
})
const rolesValidation = {
  'company': {
    cnpj: Joi.string()
  , ie: Joi.string()
  , job: Joi.string()
  , representative: Joi.string()
  , fantasyname: Joi.string()
  }
}

module.exports = { body }
