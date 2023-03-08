const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation-controller');

router.post('/:eventId', ReservationController.createReservation);
router.get('/', ReservationController.getAllReservations);
router.get('/:clientId', ReservationController.getClientReservations);

//According to our system's logic, it is only possible to delete a reservation after a period of 2-3 days has elapsed.
router.delete('/:eventId', ReservationController.cancelBooking);

module.exports = router;
