const mongoose = require('mongoose');
const User = mongoose.model('User');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
	user: User
});

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');
