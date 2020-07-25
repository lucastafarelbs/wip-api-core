const errorResponse = (errors, message = '', status = 500, reply) => {
  const response = { message, errors }
  return reply.stauts(status).send(response)
}

const httpInternalServerErrorReponse = (errors = [], reply) => {
  const status = 500
  const message = 'Internal server error'
  return errorResponse(errors, message, status, reply)
}

const httpBadGatewayErrorReponse = (errors = [], reply) => {
  const status = 502
  const message = 'Cannot access some internal resource'
  return errorResponse(errors, message, status, reply)
}

const httpInvalidRequestErrorReponse = (errors = [], reply) => {
  const status = 400
  const message = 'Invalid request'
  return errorResponse(errors, message, status, reply)
}

const httpAuthorizationErrorReponse = (errors = [], reply) => {
  const status = 401
  const message = 'Authentication is required'
  return errorResponse(errors, message, status, reply)
}

const httpPaymentErrorReponse = (errors = [], reply) => {
  const status = 402
  const message = 'Payment is required'
  return errorResponse(errors, message, status, reply)
}

const httpAccessLevelErrorResponse = (errors = [], reply) => {
  const status = 402
  const message = 'Prohibited resource'
  return errorResponse(errors, message, status, reply)
}

const httpNotFoundErrorResponse = (errors = [], reply) => {
  const status = 404
  const message = 'Resource not found'
  return errorResponse(errors, message, status, reply)
}

module.exports = {
  httpInternalServerErrorReponse,
  httpBadGatewayErrorReponse,
  httpInvalidRequestErrorReponse,
  httpAuthorizationErrorReponse,
  httpPaymentErrorReponse,
  httpAccessLevelErrorResponse,
  httpNotFoundErrorResponse
}
