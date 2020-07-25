const errorHandler = (error, request, reply) => {
  const statusCode = 400
  const { validation, validationContext } = error
  const response = (validation)
    ? {
      message: `A validation error occured when validating the '${validationContext.toUpperCase()}'...`,
      errors: validation.details.map(item => item.message.replace(/"/g, '\''))
    }
    : { message: 'A validation error ocurred.' }
  return reply.status(statusCode).send(response)
}

module.exports = errorHandler
