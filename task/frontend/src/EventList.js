import { useState, useEffect } from 'react';
import RegisterForm from './RegisterForm';

function EventsList() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch('/api/events');
      const events = await response.json();
      setEvents(events);
    }
    fetchEvents();
  }, []);

  function handleRegister(eventId) {
    setSelectedEvent(eventId);
  }

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events.map((event) => (
        <div key={event.id}>
          <img src={event.thumbnail} alt={event.title} />
          <h3>{event.title}</h3>
          <p>Start date: {event.start_date}</p>
          <p>End date: {event.end_date}</p>
          <button onClick={() => handleRegister(event.id)}>Register</button>
        </div>
      ))}
      {selectedEvent && <RegisterForm eventId={selectedEvent} />}
    </div>
  );
}

export default EventsList;
