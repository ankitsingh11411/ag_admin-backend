const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const carRoutes = require('./routes/carRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello Automobile enthusiasts!');
});

app.use('/api/admin', adminRoutes);
app.use('/api/cars', carRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
