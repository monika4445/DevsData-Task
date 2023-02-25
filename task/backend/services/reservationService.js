exports.getReservationById = async (eventId, clientId) => {
    try {
      const reservation = await Reservation.findOne({
        where: {
          event_id: eventId,
          client_id: clientId,
          canceled: false
        }
      });
      return reservation;
    } catch (err) {
      console.error(err);
      throw new Error('Server error');
    }
  };
  
  exports.cancelReservation = async (reservationId) => {
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      reservation.canceled = true;
      await reservation.save();
      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Server error');
    }
  };
  
  exports.deleteReservation = async (reservationId) => {
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
 
