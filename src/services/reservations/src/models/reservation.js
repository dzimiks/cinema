const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({

});

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');
