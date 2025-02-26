const express = require('express');
const router = express.Router();
const { addRoom, editRoom, getRoomsByApartment, getRoomById } = require('../controllers/roomController');

router.post('/:id/rooms', addRoom);
router.put('/:apartmentId/rooms/:roomId', editRoom);
router.get('/:apartmentId/rooms', getRoomsByApartment);
router.get('/:apartmentId/rooms/:roomId', getRoomById);

module.exports = router;
