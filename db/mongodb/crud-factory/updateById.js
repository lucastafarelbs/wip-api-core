const updateById = model => (newObject) =>
  model.findOneAndUpdate({ _id: newObject._id }, { $set: { ...newObject } }, { new: true })

module.exports = updateById
