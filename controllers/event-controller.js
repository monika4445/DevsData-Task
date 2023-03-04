const eventService = require('../services/event-service');

class EventController {
  
  static async createEvent(req, res) {
    const eventData = req.body;
    try {
      const event = await eventService.createEvent(eventData);
      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteEvent(req, res) {
    const eventId = req.params.eventId;
    try {
      await eventService.deleteEvent(eventId);
      res.json({ message: 'Event deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllEvents(req, res) {
    try {
      const events = await eventService.getAllEvents();
      res.json(events);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async getEventById(req, res) {
    const eventId = req.params.eventId;
    try {
      const event = await eventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.json(event);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateEvent(req, res) {
    const eventId = req.params.eventId;
    const eventData = req.body;
    try {
      await eventService.updateEvent(eventId, eventData);
      res.json({ message: 'Event updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = EventController;


  