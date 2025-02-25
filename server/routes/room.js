const express = require('express');
const router = express.Router();
const { addRoom, editRoom, getRoomsByApartment } = require('../controllers/roomController');

router.post('/:id/rooms', addRoom);
router.put('/:apartmentId/rooms/:roomId', editRoom);
router.get('/apartments/:apartmentId/rooms', getRoomsByApartment);

module.exports = router;
