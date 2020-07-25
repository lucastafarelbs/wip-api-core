const { httpFoundResponse, httpInternalServerErrorReponse } = require('../../../../support/reponser')
const businessRules = require('../../dao/business-rules')
const getById = async function (request, reply) {
  try {
    const id = request.params.id
    const found = await businessRules(this.dbConnection)('getById', id, {})
    return httpFoundResponse(found, null, reply)
  } catch (error) {
    console.log(error)
    return httpInternalServerErrorReponse(error.message, reply)
  }
}

module.exports = getById
