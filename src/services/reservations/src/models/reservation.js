const mongoose = require('mongoose');
const User = mongoose.model('User');
const Projection = mongoose.model('Projection')
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    projection: Projection,
    user: User,
    numberOfSeats: Number,
    totalPrice: String

});

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');
