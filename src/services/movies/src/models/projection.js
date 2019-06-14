const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = mongoose.model('Movie');
const Room = mongoose.model('Room');

const projectionSchema = new Schema({
	movie: Movie,
	startTime: Date,
	room: Room,
	price: Number,
	status: String,
	numberOfReservations: Number
});

module.exports = mongoose.model('Projection', projectionSchema, 'projections');
