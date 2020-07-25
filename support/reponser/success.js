const successResponse = (data, metadata, status = 200, reply) => {
  const response = { data, metadata }
  return reply.status(status).send(response)
}
const httpCreatedResponse = (data = {}, reply) => {
  const status = Object.keys(data) ? 201 : 204
  return successResponse(data, null, status, reply)
}

const httpUpdatedResponse = (data = {}, reply) => {
  const status = Object.keys(data) ? 200 : 204
  return successResponse(data, null, status, reply)
}

const httpRemovedReponse = (data = {}, reply) => {
  const status = Object.keys(data) ? 200 : 204
  return successResponse(data, null, status, reply)
}

const httpFoundResponse = (data = [], metadata = {}, reply) => {
  const status = (data.length || Object.keys(data).length || data.toString().length)
    ? 200
    : 204
  return successResponse(data, metadata, status, reply)
}

module.exports = {
  httpCreatedResponse,
  httpFoundResponse,
  httpUpdatedResponse,
  httpRemovedReponse
}
