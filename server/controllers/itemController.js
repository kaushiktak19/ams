const Apartment = require('../models/Apartment');

// Add Item
exports.addItem = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId);
    const room = apartment.rooms.id(req.params.roomId);
    room.items.push(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Edit Item
exports.editItem = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId);
    const room = apartment.rooms.id(req.params.roomId);
    const item = room.items.id(req.params.itemId);
    Object.assign(item, req.body);
    await apartment.save();
    res.status(200).json(apartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Items per Room per Apartment
exports.getItemsByRoom = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    const room = apartment.rooms.id(req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(room.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

    const room = apartment.rooms.id(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const item = room.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};