const getArrayfromString = (string, delimiter = ',') => string.split(delimiter).map(item => item.trim())

module.exports = getArrayfromString
