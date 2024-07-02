const express = require('express');
const { getReservations, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getReservations);
router.post('/', auth, createReservation);
router.put('/:id', auth, updateReservation);
router.delete('/:id', auth, deleteReservation);

module.exports = router;
