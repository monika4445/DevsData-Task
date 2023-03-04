const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation-controller');

//chi ashxatum post qani vor reservationCode pitit taqnq da
// service um chenq stanum piti inqners generacnenq voch
// te req body ic stananq

//delete chi ashxatum vororvhetev eventy valid chi 
//yst mer trvac paymani pitit 2-3 or ancni nor karoxanans 
//jnjel reservationy- res-controller 18 tox, sa normal
// error a mer logic in hamapatasxan
router.post('/:eventId', ReservationController.createReservation);
router.get('/', ReservationController.getAllReservations);
router.delete('/:eventId', ReservationController.cancelBooking);

module.exports = router;
