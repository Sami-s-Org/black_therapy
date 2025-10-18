const { getAuth } = require('../config/firebase')

/**
 * Middleware to verify Firebase authentication token
 */
const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'No authentication token provided',
      })
    }

    const token = authHeader.split('Bearer ')[1]

    const decodedToken = await getAuth().verifyIdToken(token)
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    }

    next()
  } catch (error) {
    console.error('Auth verification error:', error)
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid authentication token',
    })
  }
}

module.exports = { verifyAuth }
