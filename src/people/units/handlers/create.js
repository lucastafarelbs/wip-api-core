// const businessRules = require('../../domains/business-rules')

const getAll = async function (request, reply) {
  try {
    console.log('create')
    // const found = await businessRules(this.dbConnection)('create', null, { ...request.body })
    reply.status(200).send({
      data: {}
    })
  } catch (error) {
    reply.status(500).send({
      erro: error.message
    })
  }
}

module.exports = getAll
