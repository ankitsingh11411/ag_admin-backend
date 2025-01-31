const express = require('express');
const {
  addCar,
  getAllCars,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'rev', maxCount: 1 },
    { name: 'flyby', maxCount: 1 },
    { name: 'launchControl', maxCount: 1 },
  ]),
  addCar
);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);
router.get('/', getAllCars);

module.exports = router;
