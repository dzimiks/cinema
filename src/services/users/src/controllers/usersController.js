const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.getUsers = (req, res) => {
	const query = User.find({}, (err, docs) => {
		if (!err) {
			console.log('Users imported!');
		} else {
			throw err;
		}
	});

	query.exec((err, users) => {
		if (err) {
			console.log(err);
		}

		res.render('users', {
			meta: {
				title: 'Users'
			},
			users: users
		});
	});
};

module.exports.getAllUsers = (req, res) => {
	const query = User.find({}, (err, docs) => {
		if (!err) {
			console.log('Users imported!');
		} else {
			throw err;
		}
	});

	query.exec((err, users) => {
		if (err) {
			console.log(err);
		}

		res.send(users);
	});
};

module.exports.addUser = (req, res) => {
	const user = new User({
		firstName: req.body.firstNameSignup,
		lastName: req.body.lastNameSignup,
		email: req.body.emailSignup,
		username: req.body.usernameSignup,
		password: req.body.passwordSignup,
		role: {
			name: 'user',
			description: 'User description.'
		},
		isBanned: false,
		banHistory: [],
		status: {
			name: 'REGULAR',
			pointsFrom: 0,
			pointsTo: 5,
			discount: 0
		},
		reservationNumber: 0
	});

	user.save((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("User is saved to database!");
		}
	});

	res.render('add-user', {
		meta: {
			title: 'Users'
		},
		data: JSON.stringify(req.body, null, 4)
	});
};

module.exports.signin = (req, res) => {
	res.render('signin', {
		meta: {
			title: 'Users'
		}
	});
};

module.exports.signup = (req, res) => {
	res.render('signup', {
		meta: {
			title: 'Users'
		}
	});
};
