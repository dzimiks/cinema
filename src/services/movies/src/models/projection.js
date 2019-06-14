const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = mongoose.model('Movie');

const projectionSchema = new Schema({
	movie: Movie
});

module.exports = mongoose.model('Projection', projectionSchema, 'projection');
