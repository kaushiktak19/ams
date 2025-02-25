const express = require('express');
const router = express.Router();
const { addItem, editItem, getItemsByRoom } = require('../controllers/itemController');

router.post('/:apartmentId/rooms/:roomId/items', addItem);
router.put('/:apartmentId/rooms/:roomId/items/:itemId', editItem);
router.get('/apartments/:apartmentId/rooms/:roomId/items', getItemsByRoom);

module.exports = router;
