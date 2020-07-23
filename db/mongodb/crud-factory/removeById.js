const removeById = model => id => model.findOneAndDelete({ _id: id })

module.exports = removeById
