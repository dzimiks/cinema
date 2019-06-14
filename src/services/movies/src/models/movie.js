const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @swagger
 * definitions:
 *   Movie:
 *     type: object
 *     properties:
 *       url: string
 *       title: string
 *       genre: string
 *       description: string
 *       actors: array
 *       duration: number
 */
const movieSchema = new Schema({
	url: String,
	title: String,
	genre: String,
	description: String,
	actors: Array,
	duration: Number
});

function makeSlug(text) {
	return text.toString().toLowerCase()
		.replace(/\s+/g, '-')     // Replace spaces with '-'
		.replace(/\-\-+/g, '-')   // Replace multiple '-' with single '-'
		.replace(/[&\/\\#,+()$~%.'"![\]^:*@_=;?<>{}]/g, '') // Remove all special characters except '-'
		.replace(/^-+/, '')       // Trim '-' from start of text
		.replace(/-+$/, '');      // Trim '-' from end of text
}

// Generate the slug
movieSchema.pre('save', function (next) {
	this.url = makeSlug(this.title);
	next();
});

movieSchema.pre('update', function (next) {
	const set = this.getUpdate().$set;
	const title = set.title;
	this.update({}, {$set: {'url': makeSlug(title)}});
	next();
});

module.exports = mongoose.model('Movie', movieSchema, 'movies');
