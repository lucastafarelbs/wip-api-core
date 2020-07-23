const findById = (id) => (model) => model.findById({ _id: id })

module.exports = findById
