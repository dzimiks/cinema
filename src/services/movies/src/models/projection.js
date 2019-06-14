const mongoose = require('mongoose');
const Schema = mongoose.Schema;



/**
 * @swagger
 * definition:
 *   Projection:
 *     type: object
 *     properties:
 *       movie: Movie
 *       startTime: Date
 *       room : Room
 *       price : number
 *       statu : string
 *       numberOfReservations : number
 */
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
