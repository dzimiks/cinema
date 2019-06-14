const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
