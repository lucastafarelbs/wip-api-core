const GetModel = require('../../../get-model.js')
const CurrentDatetimeUtc= require('../../../../support/in-house-functions/date-time/current-datetime-utc')
const isEmpty = require('lodash/isEmpty')
const aggregateOptions = require('../../../../support/in-house-functions/helpers/aggregate/aggregate-options')
const aggregateQuery = require('../../../../support/in-house-functions/helpers/aggregate/aggregate-query')
const aggregateExtraFields = require('../../../../support/in-house-functions/helpers/aggregate/aggregate-extra-fields')
const aggregateLookup = require('../../../../support/in-house-functions/helpers/aggregate/aggregate-lookup')


const getAll = async ( req, query={}, options ) => {
  const model = GetModel( req.$connection, req.$model )
  const option = aggregateOptions(options)
  const one = await model.findOne({})
  const queries = aggregateQuery(query, ['name', 'address.city'])
  const lookupReservation = aggregateLookup('reservations', '_id', 'client', 'reservations')
  const count = await model.countDocuments(queries.$match)
  const extraFields = aggregateExtraFields([
    {'propName': 'count', value: count}
    , {'propName': 'label', value: '$name'}
    , {'propName': 'value', value: '$_id'}
  ])
  const aggregate =  [
    lookupReservation
    , queries
    , extraFields
    , ...option
    , { $addFields: { lastReservation: { $max: '$reservations.inDate'}}}
    , { $project: { 'reservations': 0 }}
  ]
  const result = await model.aggregate( aggregate )
  return result
}


module.exports = { getAll }
