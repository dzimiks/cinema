const express = require('express');
const router = express.Router();
const apiGateway = require('./apiGateway');

const BASE_URL = 'http://localhost:3000';
const api = apiGateway(BASE_URL);

const moviesController = require('../services/movies/src/controllers/moviesController');
const reservationsController = require('../services/reservations/src/controllers/reservationsController');
const usersController = require('../services/users/src/controllers/usersController');

// Setting layout for all "user" requests to main layout, and passing control to next handler
router.all('/*', function (req, res, next) {
	req.app.locals.layout = 'layout';
	next();
});

// GET movies
router.get('/', moviesController.getMovies);
router.get('/movies/:url', moviesController.getMovie);
router.get('/edit-movie/:id', moviesController.editMovie);
router.get('/delete-movie/:id', moviesController.deleteMovie);

// GET users
router.get('/signin', usersController.signin);
router.get('/signup', usersController.signup);
router.get('/profile', usersController.profile);

// API
router.get('/api/movies', moviesController.getAllMovies);
router.get('/api/reservations', reservationsController.getAllReservations);
router.get('/api/users', usersController.getAllUsers);

// POST
router.post('/add-movie', moviesController.addMovie);
router.post('/make-reservation', reservationsController.makeReservation);
router.post('/add-user', usersController.addUser);

module.exports = router;
