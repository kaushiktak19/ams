const express = require('express');
const router = express.Router();
const { getAllApartments, addApartment, editApartment } = require('../controllers/apartmentController');

router.get('/', getAllApartments);
router.post('/', addApartment);
router.put('/:id', editApartment);

module.exports = router;
