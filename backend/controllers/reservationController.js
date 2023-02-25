const reservationService = require('../services/reservationService');
const Reservation = require('../models/reservation');

exports.getReservationById = async (req, res, next) => {
  const { eventId, clientId } = req.params;
  try {
    const reservation = await reservationService.getReservationById(eventId, clientId);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    return res.status(200).json({ reservation });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.cancelReservation = async (req, res) => {
    try {
      const { reservationId } = req.params;
      const result = await reservationService.cancelReservation(reservationId);
      if (!result) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      return res.status(200).json({ message: 'Reservation canceled' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };

exports.deleteReservation = async (req, res) => {
  const reservationId = req.params.reservationId;
  try {
    // Check if reservation exists
    const reservation = await reservationService.getReservationById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    // Check if reservation is eligible for cancellation
    const now = new Date();
    const startDate = new Date(reservation.start_date);
    const timeDiff = startDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (daysDiff < 2) {
      return res.status(400).json({ message: 'Reservation cannot be cancelled less than 2 days before the start date' });
    }
    
    // Delete the reservation
    await reservationService.deleteReservation(reservationId);
    res.json({ message: 'Reservation cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
