const reservationService = require('../services/reservation-service');
const eventService = require('../services/event-service');

class ReservationController {
  static async cancelBooking(req, res) {
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
      const reservation = await reservationService.getReservationByEventAndClient(eventId, clientId);
      if (!reservation) {
        throw new Error('Client does not have a valid reservation for the event');
      }

      // Cancel the reservation
      await reservationService.cancelReservation(reservation.id);

      res.json({ message: 'Reservation canceled successfully' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  static async getClientReservations(req, res) {
    const clientId = req.headers.clientid;

    try {
      const reservations = await reservationService.getReservationsByClient(clientId);

      res.json({ reservations });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  static async getAllReservations(req, res) {
    try {
      const reservations = await reservationService.getAllReservations();
      res.json(reservations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async createReservation(req, res) {
    const eventId = req.params.eventId;
    const clientId = req.headers.clientid;

    try {
      // Create a new reservation
      const reservation = await reservationService.createReservation(eventId, clientId);

      res.json({ reservation });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = ReservationController;
