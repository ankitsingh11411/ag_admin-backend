const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  power: { type: Number, required: true },
  torque: { type: Number, required: true },
  description: { type: String, required: true },
  productionYear: { type: Number, required: true },
  topSpeed: {
    value: { type: Number, required: true },
    unit: { type: String, enum: ['mph', 'kmh'], default: 'kmh' },
  },
  images: [{ type: String }],
  sounds: {
    rev: { type: String },
    flyby: { type: String },
    launchControl: { type: String },
  },
});

module.exports = mongoose.model('Car', carSchema);
