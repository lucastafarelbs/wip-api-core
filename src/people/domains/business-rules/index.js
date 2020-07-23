const crudFactory = require('../../../../db/mongodb/crud-factory')()
const Path = require('path')
const modelName = Path.join(__dirname, '..', '..').split(Path.sep).pop()
const getModel = require('../../../../db/mongodb/get-model')

const crud = {
  ...crudFactory
}

const applyModel = (connection, modelName) => getModel(connection, modelName)

module.exports = connection =>
  (func, id, object) => (crud[func])
    ? crud[func](id, object)(applyModel(connection, modelName))
    : Promise.reject(new Error(`Method ${func} not found`))
