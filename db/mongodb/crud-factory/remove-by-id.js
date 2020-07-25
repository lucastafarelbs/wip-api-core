const removeById = id => model => model.findOneAndDelete({ _id: id })

module.exports = removeById
