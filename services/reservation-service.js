const { Reservation } = require('../models');


class ReservationService {

  static async createReservation(eventId, clientId) {
    try {const reservation = await Reservation.create({
      event_id: eventId,
      client_id: clientId,
    });
    return reservation.toJSON();
  }
  catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
};

static async getAllReservations(){
  try {
    const reservations = await Reservation.findAll();
    return reservations;
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}

  static async getReservationById(reservationId){
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      return reservation;
    } catch (err) {
      console.error(err);
      throw new Error('Server error');
    }
  };

  static async getReservationByEventAndClient(eventId, clientId) {
    try {
      const reservation = await Reservation.findOne({
        where: { event_id: eventId, client_id: clientId },
      });
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      return reservation.toJSON();
    } catch (err) {
      console.error(err);
      throw new Error('Server error');
    }
  };

  
  static async cancelReservation(reservationId){
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      await reservation.destroy();
      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Server error');
    }
  };

  static async getReservationsByClient(clientId) {
    const reservations = await Reservation.findAll({
      where: { client_id: clientId },
    });
    return reservations.map((reservation) => reservation.toJSON());
  }  
}

module.exports = ReservationService;

 
