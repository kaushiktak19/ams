const mongoose = require('mongoose');
const itemSchema = require('./Item');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema]
});

module.exports = roomSchema;
