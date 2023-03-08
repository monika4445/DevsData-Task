const { Reservation } = require('../models');


class ReservationService {

static async createReservation(eventId, clientId) {
  try {
    const reservationCode = generateReservationCode();
    const reservation = await Reservation.create({
      eventId: eventId,
      clientId: clientId,
      reservationCode: reservationCode, 
    });
    return reservation.toJSON();
  } catch (err) {
    console.error(err);
    throw new Error('Server error');
  }
}


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
        where: { eventId: eventId, clientId: clientId },
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
      where: { clientId: clientId },
    });
    return reservations.map((reservation) => reservation.toJSON());
  }  
}

//Generate a reservation code using a combination of a timestamp and a random alphanumeric string
function generateReservationCode() {
  const timestamp = Date.now().toString(36); // Convert current time to base36 string
  const randomStr = Math.random().toString(36).substr(2, 5); // Generate 5-character random alphanumeric string
  return `${timestamp}-${randomStr}`;
}

module.exports = ReservationService;

