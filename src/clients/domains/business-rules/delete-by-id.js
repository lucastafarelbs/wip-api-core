const GetModel = require('../../../get-model.js')

const Path = require('path')
const thisDomain = Path.dirname( Path.dirname( __filename ) ).split( Path.sep ).pop()

const deleteById = async ( req, query ) => {
  const model = GetModel(req.$connection, req.$model)
  const found = await model.findOne( query )
  if (!found)
    throw new Error(`${thisDomain}Error: Document Not Found.`)
  return await model.deleteOne( query )
}
module.exports = { deleteById }