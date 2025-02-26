const express = require('express');
const router = express.Router();
const { getAllApartments, addApartment, editApartment, getApartmentById } = require('../controllers/apartmentController');

router.get('/', getAllApartments);
router.get('/:id', getApartmentById);
router.post('/', addApartment);
router.put('/:id', editApartment);

module.exports = router;
