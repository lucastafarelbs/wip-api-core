const findAll = (query = {}) => model => model.find(query)

module.exports = findAll
