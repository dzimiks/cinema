const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @swagger
 * definitions:
 *   Room:
 *     type: object
 *     properties:
 *       number: number
 *       rows: number
 *       seatsInRow: number
 */
const roomSchema = new Schema({
	number: Number,
	rows: Number,
	seatsInRow: Number
});

module.exports = mongoose.model('Room', roomSchema, 'rooms');
