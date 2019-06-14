const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectionSchema = new Schema({
    roomNumber: Number,
    numberOfRows:Number,
    seatsInRow: Number,


});

module.exports = mongoose.model('ProjectionRoom', projectionSchema, 'projectionRooms');
