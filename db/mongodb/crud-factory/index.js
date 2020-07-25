const create = require('./create')
const getById = require('./get-by-id')
const getAll = require('./get-all')
const updateById = require('./update-by-id')
const removeById = require('./remove-by-id')

const crudFactory = () => ({
  create,
  getById,
  getAll,
  updateById,
  removeById
})

module.exports = crudFactory
