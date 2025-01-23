const express = require('express');
const {
  addCar,
  getAllCars,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authenticate);

router.post('/', addCar);
router.get('/', getAllCars);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
