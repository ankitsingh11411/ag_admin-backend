const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(403).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Invalid token format' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: 'Failed to authenticate token' });

    req.admin = decoded;
    next();
  });
};
