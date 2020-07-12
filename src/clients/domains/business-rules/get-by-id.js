const GetModel = require('../../../get-model.js')
const aggregateQuery = require('../../../../support/in-house-functions/helpers/aggregate/aggregate-query')
const aggregateExtraFields = require('../../../../support/in-house-functions/helpers/aggregate/aggregate-extra-fields')

const getById = async ( req, query, options ) => {
  const model = GetModel( req.$connection, req.$model )
  const modelEmail = GetModel( req.$connection, 'emails' )
  const modelDocument = GetModel( req.$connection, 'documents' )

  const emailExtraFields = aggregateExtraFields([{ propName: 'label', value: '$tittle'},{ propName: 'value', value: '$_id'}])
  const emails = await modelEmail.aggregate([{$match: {model: 'Cliente'}}, emailExtraFields, {$project: {_id: 0, value: 1, label: 1}}])

  const documentExtraFields = aggregateExtraFields([{ propName: 'label', value: '$name'},{ propName: 'value', value: '$_id'} ])
  const documents = await modelDocument.aggregate([{$match: {model: 'Cliente'}}, documentExtraFields, {$project: {_id: 0, value: 1, label: 1}}])

  const queries = aggregateQuery(query)
  const extraFields = aggregateExtraFields([
    {propName: 'email', value: emails},
    {propName: 'document', value: documents}
  ])
  const doc = await model.aggregate([queries, extraFields])
  return doc[0] || {}
}

module.exports = { getById }
