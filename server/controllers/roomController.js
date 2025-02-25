const Apartment = require('../models/Apartment');

// Add Room
exports.addRoom = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    apartment.rooms.push(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit Room
exports.editRoom = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId);
    const room = apartment.rooms.id(req.params.roomId);
    Object.assign(room, req.body);
    await apartment.save();
    res.status(200).json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all rooms for a specific apartment
exports.getRoomsByApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json(apartment.rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

     
  