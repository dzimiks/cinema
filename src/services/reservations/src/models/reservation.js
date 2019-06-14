const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @swagger
 * definition:
 *   Reservation:
 *     type: object
 *     properties:
 *       projection: Projection
 *         type: string
 *		 user: User
 *		 numberOfSeats: number
 *		 price: number
 */
const reservationSchema = new Schema({
	projection: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Projection'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	numberOfSeats: Number,
	price: Number
});

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');
