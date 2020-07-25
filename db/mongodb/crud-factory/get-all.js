const getAll = (query = {}) => model => model.find(query)

module.exports = getAll
