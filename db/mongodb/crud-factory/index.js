const create = require('./create')
const findById = require('./findById')
const findAll = require('./findAll')
const updateById = require('./updateById')
const removeById = require('./removeById')

const crudFactory = () => ({
  create,
  findById,
  findAll,
  updateById,
  removeById
})

module.exports = crudFactory
