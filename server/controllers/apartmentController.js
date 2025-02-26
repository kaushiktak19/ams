const Apartment = require('../models/Apartment');

// Get all apartments
exports.getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new apartment
exports.addApartment = async (req, res) => {
  try {
    const newApartment = new Apartment(req.body);
    await newApartment.save();
    res.status(201).json(newApartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit apartment
exports.editApartment = async (req, res) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedApartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
