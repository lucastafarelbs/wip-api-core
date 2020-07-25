const updateById = (id, newObject) => (model) => {
  console.log(model)
  console.log(id)
  console.log(newObject)
  return model.findByIdAndUpdate(id, { $set: { ...newObject } }, { new: true })
}

module.exports = updateById
