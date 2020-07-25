const findById = (id) => (model) => {
  console.log(id)
  return model.findOne({_id: id})
}

module.exports = findById
