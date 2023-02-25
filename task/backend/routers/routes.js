const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');
const reservationController = require('../controllers/reservationController');

router.get('/events', eventController.getAllEvents);
router.get('/events/:eventId', eventController.getEventById);
router.post('/events', eventController.createEvent);
router.put('/events/:eventId', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent);
router.delete('/events/:eventId/cancel', eventController.cancelBooking);
router.delete('/reservations/:reservationId', reservationController.deleteReservation);
router.get('/reservations/:eventId/:clientId', reservationController.getReservationById);
router.put('/reservations/:reservationId/cancel', reservationController.cancelReservation);

module.exports = router;
