const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: Number(process.env.PORT) || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'change_this_secret',
  COOKIE_NAME: process.env.COOKIE_NAME || 'auth_token',
  COOKIE_MAX_AGE: Number(process.env.COOKIE_MAX_AGE_MS) || 24 * 60 * 60 * 1000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};
