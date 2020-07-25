const businessRules = require('../../dao/business-rules')

const getAll = async function (request, reply) {
  try {
    const found = await businessRules(this.dbConnection)('findById', 1)
    reply.status(200).send({ data: found })
  } catch (error) {
    reply.status(500).send({ erro: error.message })
  }
}

module.exports = getAll
