const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const projectionSchema = new Schema({
	movie: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie'
	},
	startTime: Date,
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	},
	price: Number,
	status: String,
	numberOfReservations: Number
});

module.exports = mongoose.model('Projection', projectionSchema, 'projections');
