const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const roomSchema = new Schema({
	number: Number,
	rows: Number,
	seatsInRow: Number
});

module.exports = mongoose.model('Room', roomSchema, 'rooms');
