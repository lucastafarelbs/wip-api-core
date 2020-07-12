// const Admin = require('firebase-admin')

const authenticate = async (req, res, next) => {
  console.log('@?')
  console.log(req)
  if (!req.route.spec.needAuth) return next()
  console.log('')
}
module.exports = authenticate
