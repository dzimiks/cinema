const mongoose = require('mongoose');
const moment = require('moment');

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
	let startTime = req.body.reservationStartTime;
	startTime = startTime.split(' ');
	startTime = moment(startTime[0] + startTime[1].substring(0, startTime[1].length - 2), 'YYYY-MM-DD HH:mm:ss').toDate();
	console.log(startTime);

	const projection = new Projection({
		startTime: startTime,
		numberOfReservations: req.body.numberOfReservations
	});

	const reservation = new Reservation({
		projection: projection,
		numberOfSeats: req.body.numberOfSeats,
		price: req.body.reservationPrice
	});

	projection.save((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Projection is saved to database!");
		}
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
		data: startTime
	});
};
