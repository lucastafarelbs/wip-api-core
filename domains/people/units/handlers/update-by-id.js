const { httpInternalServerErrorReponse, httpUpdatedResponse } = require('../../../../support/reponser')
const businessRules = require('../../dao/business-rules')
const removeById = async function (request, reply) {
  try {
    const id = request.params.id
    const newObject = { ...request.body.value }
    const updated = await businessRules(this.dbConnection)('updateById', id, newObject)
    return httpUpdatedResponse(updated, reply)
  } catch (error) {
    console.log(error)
    return httpInternalServerErrorReponse(error.message, reply)
  }
}

module.exports = removeById
