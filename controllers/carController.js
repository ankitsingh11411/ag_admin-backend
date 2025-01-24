const Car = require('../models/Car');

const addCar = async (req, res) => {
  try {
    const { files, body } = req;
    const images = files.images?.map((file) => file.path) || [];
    const sounds = {
      rev: files.rev?.[0]?.path || null,
      flyby: files.flyby?.[0]?.path || null,
      launchControl: files.launchControl?.[0]?.path || null,
    };

    const carData = {
      ...body,
      topSpeed: {
        value: body.topSpeedValue,
        unit: body.topSpeedUnit,
      },
      images,
      sounds,
    };

    const car = new Car(carData);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ message: 'Error adding car', error });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error });
  }
};

const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCar) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Error updating car', error });
  }
};

const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json({ message: 'Car deleted', deletedCar });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error });
  }
};

module.exports = { addCar, getAllCars, updateCar, deleteCar };
