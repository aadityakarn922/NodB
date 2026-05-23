const bcrypt = require('bcrypt');
const users = require('../data/users');
const { generateToken } = require('../utils/jwt');
const { COOKIE_NAME, COOKIE_MAX_AGE, NODE_ENV } = require('../config/env');

async function signup(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const normalizedEmail = email.toLowerCase();
  const existingUser = users.find((user) => user.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    email: normalizedEmail,
    password: hashedPassword,
  };
  users.push(newUser);

  return res.status(201).json({ message: 'User created successfully' });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const normalizedEmail = email.toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ id: user.id, email: user.email });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
  });

  return res.json({ message: 'Logged in successfully', token });
}

function logout(req, res) {
  res.clearCookie(COOKIE_NAME);
  return res.json({ message: 'Logged out successfully' });
}

function profile(req, res) {
  return res.json({ message: 'Protected profile data', user: req.user });
}

module.exports = {
  signup,
  login,
  logout,
  profile,
};
