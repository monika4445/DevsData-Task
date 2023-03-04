const { Event } = require('../models');

class EventService {
  static async getAllEvents(){
  try {
    const events = await Event.findAll();
    return events;
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}

static async getEventById(eventId){
  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}

static async createEvent(eventData){
  const { title, start_date, end_date, thumbnail } = eventData;
  try {
    const event = await Event.create({
      title,
      start_date,
      end_date,
      thumbnail,
    });
    return event;
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}

static async updateEvent(eventId, eventData){
  const { title, start_date, end_date, thumbnail } = eventData;
  try {
    let event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    event.title = title;
    event.start_date = start_date;
    event.end_date = end_date;
    event.thumbnail = thumbnail;
    event = await event.save();
    return event;
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}

static async deleteEvent(eventId){
  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    await event.destroy();
    return true;
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}
}

module.exports = EventService;
