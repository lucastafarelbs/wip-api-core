const { httpFoundResponse, httpInternalServerErrorReponse } = require('../../../../support/reponser')
const { getArrayfromString } = require('../../../../support/utils')
const businessRules = require('../../dao/business-rules')
const getAll = async function (request, reply) {
  try {
    const query = { ...request.query.value }
    const fields = getArrayfromString(query.fields)
    const found = await businessRules(this.dbConnection)('getAll', null, {})
    return httpFoundResponse(found, { query, fields }, reply)
  } catch (error) {
    return httpInternalServerErrorReponse(error.message, reply)
  }
}

module.exports = getAll
