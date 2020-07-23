const authenticate = async (req, res) => {
  // At this moment we're not using authentication services, so, go on.
  const useAuth = false
  if (!useAuth) return null

  // both are valid, check the best approach when oficial
  // return res.status(500).send('oops')
  // return Promise.reject(new Error('Error on authentication preHandler'))
}
module.exports = authenticate
