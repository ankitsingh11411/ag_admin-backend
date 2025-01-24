const express = require('express');
const {
  addCar,
  getAllCars,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { authenticate } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

router.use(authenticate);

router.post(
  '/',
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'rev', maxCount: 1 },
    { name: 'flyby', maxCount: 1 },
    { name: 'launchControl', maxCount: 1 },
  ]),
  addCar
);
router.get('/', getAllCars);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
