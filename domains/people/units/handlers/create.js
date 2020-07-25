const { httpInternalServerErrorReponse, httpCreatedResponse } = require('../../../../support/reponser')
const businessRules = require('../../dao/business-rules')
const create = async function (request, reply) {
  try {
    const body = { ...request.body.value }
    const created = await businessRules(this.dbConnection)('create', null, { ...body })
    return httpCreatedResponse(created, reply)
  } catch (error) {
    console.log(error)
    return httpInternalServerErrorReponse(error.message, reply)
  }
}

module.exports = create
