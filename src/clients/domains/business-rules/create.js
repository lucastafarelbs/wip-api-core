const EncryptText = require('../../../../support/in-house-functions/cryptography/encrypt-text.js')
const CurrentDatetimeUtc = require('../../../../support/in-house-functions/date-time/current-datetime-utc.js')
const GetModel = require('../../../get-model.js')
const Joi = require('joi')

const validateBody = ( body, schema ) => {
  const validationOptions = {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: true
  }

  return Joi.validate( body, schema, validationOptions )
}


const create = async ( req, data ) => {
  const model = GetModel( req.$connection, req.$model )
  const schema = require(`../validations/create.validations.js`)
  if ( !data )
    return { message: `${ thisDomain }Error: Data is required.` }
  await validateBody( req.body, schema.body(data.role) )
  const docCreated = await model.create( {...data } )
  return docCreated
}

module.exports = { create }
