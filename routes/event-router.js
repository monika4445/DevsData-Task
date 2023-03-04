const express = require('express');
const router = express.Router();
const EventController = require('../controllers/event-controller');

router.get('/', EventController.getAllEvents);
router.get('/:eventId', EventController.getEventById);
router.post('/', EventController.createEvent);
router.put('/:eventId', EventController.updateEvent);
router.delete('/:eventId', EventController.deleteEvent);

module.exports = router;
