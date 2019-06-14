const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

module.exports.getMovies = (req, res) => {
	const query = Movie.find({}, (err, docs) => {
		if (!err) {
			console.log('Movies imported!');
			// console.log('Movies:', docs);
		} else {
			throw err;
		}
	});

	query.exec((err, movies) => {
		if (err) {
			console.log(err);
		}

		// console.log('Movies:', movies);

		res.render('home', {
			meta: {
				title: 'Movies'
			},
			movies: movies
		});
	});
};

module.exports.getAllMovies = (req, res) => {
	const query = Movie.find({}, (err, docs) => {
		if (!err) {
			console.log('Movies imported!');
			// console.log('Movies:', docs);
		} else {
			throw err;
		}
	});

	query.exec((err, movies) => {
		if (err) {
			console.log(err);
		}

		// console.log('Movies:', movies);
		res.send(movies);
	});
};

module.exports.getMovie = (req, res) => {
	const query = Movie.findOne({'url': req.params.url}, (err, docs) => {
		if (!err) {
			console.log('Movie imported!');
			console.log('Movie:', docs);
		} else {
			throw err;
		}
	});

	query.exec((err, movie) => {
		if (err) {
			console.log(err);
		}

		console.log('Movie:', movie);

		res.render('movie', {
			meta: {
				title: 'Movies'
			},
			movie: movie
		});
	});
};

module.exports.addMovie = (req, res) => {
	const actors = req.body.movieActors.split(',').map(item => item.trim());

	const movie = new Movie({
		title: req.body.movieTitle,
		genre: req.body.movieGenre,
		description: req.body.movieDescription,
		actors: actors,
		duration: req.body.movieDuration
	});

	movie.save((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Movie is saved to database!");
		}
	});

	res.render('add-movie', {
		meta: {
			title: 'Movies'
		},
		data: JSON.stringify(req.body, null, 4)
	});
};

module.exports.editMovie = (req, res) => {
	Movie.findOneAndUpdate({'_id': req.params.id}, {description: 'Edited description'}, {upsert: true}, (err) => {
		if (err) {
			return res.send(500, {error: err});
		}

		return res.send("Successfully edited movie!");
	});
};

module.exports.deleteMovie = (req, res) => {
	Movie.deleteOne({'_id': req.params.id}, (err) => {
		if (err) {
			return res.send(500, {error: err});
		}

		return res.send("Successfully deleted movie!");
	});
};
