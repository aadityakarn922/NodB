const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { PORT } = require('./config/env');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Auth server running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
