const eventService = require('../services/eventService');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEventById = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const event = await eventService.getEventById(eventId);
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const eventData = req.body;
  try {
    const event = await eventService.createEvent(eventData);
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const eventData = req.body;
  try {
  const event = await eventService.updateEvent(eventId, eventData);
  res.json(event);
  } catch (err) {
  console.error(err);
  res.status(500).json({ message: err.message });
  }
  };
  
  exports.deleteEvent = async (req, res) => {
  const eventId = req.params.eventId;
  try {
  await eventService.deleteEvent(eventId);
  res.json({ message: 'Event deleted successfully' });
  } catch (err) {
  console.error(err);
  res.status(500).json({ message: err.message });
  }
  };

  exports.cancelBooking = async (req, res) => {
    const eventId = req.params.eventId;
    const clientId = req.headers.clientid;
  
    try {
      const event = await eventService.getEventById(eventId);
  
      // Check if the event is valid for cancellation
      const today = new Date();
      const start_date = new Date(event.start_date);
      const end_date = new Date(event.end_date);
  
      if (end_date.getTime() - start_date.getTime() > 86400000 * 2 || start_date.getTime() - today.getTime() < 86400000 * 2) {
        throw new Error('Event is not valid for cancellation');
      }
  
      // Check if the client has a valid reservation for the event
      const reservation = await eventService.getReservationById(eventId, clientId);
      if (!reservation) {
        throw new Error('Client does not have a valid reservation for the event');
      }
  
      // Cancel the reservation
      await eventService.cancelReservation(reservation.id);
  
      res.json({ message: 'Reservation canceled successfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  };

  