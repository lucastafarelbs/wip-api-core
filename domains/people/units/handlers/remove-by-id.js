const { httpInternalServerErrorReponse, httpRemovedReponse } = require('../../../../support/reponser')
const businessRules = require('../../dao/business-rules')
const removeById = async function (request, reply) {
  try {
    const id = request.params.id
    const removed = await businessRules(this.dbConnection)('removeById', id, {})
    return httpRemovedReponse(removed, reply)
  } catch (error) {
    console.log(error)
    return httpInternalServerErrorReponse(error.message, reply)
  }
}

module.exports = removeById
