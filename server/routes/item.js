const express = require('express');
const router = express.Router();
const { addItem, editItem, getItemsByRoom, getItemById } = require('../controllers/itemController');

router.post('/:apartmentId/rooms/:roomId/items', addItem);
router.put('/:apartmentId/rooms/:roomId/items/:itemId', editItem);
router.get('/:apartmentId/rooms/:roomId/items', getItemsByRoom);
router.get('/:apartmentId/rooms/:roomId/items/:itemId', getItemById);

module.exports = router;
