const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = mongoose.model('Movie');
const ProjectionRoom = mongoose.model('ProjectionRoom')

const projectionSchema = new Schema({
    movie: Movie,
    startTime: Date,
    projectionRoom : ProjectionRoom,
    ticketPrice: String,
    status: String,
    numberOfReservations:Number


});

module.exports = mongoose.model('Projection', projectionSchema, 'projections');
