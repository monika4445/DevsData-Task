const { Event } = require('../models');

exports.getAllEvents = async () => {
  try {
    const events = await Event.findAll();
    return events;
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
};

exports.getEventById = async (eventId) => {
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
};

exports.createEvent = async (eventData) => {
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
};

exports.updateEvent = async (eventId, eventData) => {
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
};

exports.deleteEvent = async (eventId) => {
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
};
