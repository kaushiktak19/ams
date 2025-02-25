const mongoose = require('mongoose');
const roomSchema = require('./Room');

const apartmentSchema = new mongoose.Schema({
  address: { type: String, required: true },
  stairsOrElevator: { type: String, required: true },
  floor: { type: Number, required: true },
  size: { type: Number, required: true },
  rooms: [roomSchema]
});

module.exports = mongoose.model('Apartment', apartmentSchema);
