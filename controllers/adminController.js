const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

const admins = [
  {
    username: process.env.ADMIN1_USERNAME,
    password: process.env.ADMIN1_PASSWORD,
  },
  {
    username: process.env.ADMIN2_USERNAME,
    password: process.env.ADMIN2_PASSWORD,
  },
];

const login = (req, res) => {
  const { username, password } = req.body;

  const admin = admins.find(
    (admin) => admin.username === username && admin.password === password
  );

  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ message: 'Login successful', token });
};

module.exports = { login };
