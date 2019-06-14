const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *         type: integer
 *       email:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *		 role: Role
 *		 isBanned: boolean
 *		 banHistory: array
 *		 status: status
 *		 reservationNumber:number
 *       required:
 *         - email
 *         - username
 *         - password
 */
const userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String,
	role: {
		name: String,
		description: String
	},
	isBanned: Boolean,
	banHistory: Array,
	status: {
		name: String,
		pointsFrom: Number,
		pointsTo: Number,
		discount: Number
	},
	reservationNumber: Number
});

module.exports = mongoose.model('User', userSchema, 'users');
