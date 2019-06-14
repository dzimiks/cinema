const mongoose = require('mongoose');

const Reservation = mongoose.model('Reservation');
const Projection = require('../../../movies/src/models/projection');

module.exports.getAllReservations = (req, res) => {
	const query = Reservation.find({}, (err, docs) => {
		if (!err) {
			console.log('Reservations imported!');
		} else {
			throw err;
		}
	});

	query.exec((err, reservations) => {
		if (err) {
			console.log(err);
		}

		res.send(reservations);
	});
};

module.exports.makeReservation = (req, res) => {
	const projection = new Projection({
		startTime: req.body.reservationStartTime,
		numberOfReservations: req.body.numberOfReservations
	});

	const reservation = new Reservation({
		projection: projection,
		numberOfSeats: req.body.numberOfSeats,
		price: req.body.reservationPrice
	});

	reservation.save((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Reservation is saved to database!");
		}
	});

	res.render('add-movie', {
		meta: {
			title: 'Reservation'
		},
		data: JSON.stringify(req.body, null, 4)
	});
};
