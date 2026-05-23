const { COOKIE_NAME } = require('../config/env');
const { verifyToken } = require('../utils/jwt');

function authenticateMiddleware(req, res, next) {
  const token = req.cookies[COOKIE_NAME] || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authenticateMiddleware;
