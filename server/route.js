async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection('test_collection')

  fastify.get('/', async (request, reply) => {
    return {
      hello: 'world'
    }
  })

  fastify.get('/animals', async (request, reply) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      return reply.send({ data: [], message: 'Not found' })
    }
    return result
  })
  const opts = {
    schema: {
      querystring: {

      },
      body: {
        type: 'object',
        properties: {
          someKey: {
            type: 'string'
          },
          someOtherKey: {
            type: 'number'
          }
        },
        required: ['someKey']
      }
    }
  }

  fastify.post('/', opts, async (request, reply) => {
    return {
      hello: 'world'
    }
  })
}

module.exports = routes
