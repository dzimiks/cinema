const express = require('express');
const router = express.Router();

const moviesController = require('../services/movies/src/controllers/moviesController');
const usersController = require('../services/users/src/controllers/usersController');

// Setting layout for all "user" requests to main layout, and passing control to next handler
router.all('/*', function (req, res, next) {
	req.app.locals.layout = 'layout';
	next();
});

// GET
router.get('/', moviesController.getMovies);
router.get('/movies/:url', moviesController.getMovie);
router.get('/edit-movie/:id', moviesController.editMovie);
router.get('/delete-movie/:id', moviesController.deleteMovie);
router.get('/signin', usersController.signin);
router.get('/signup', usersController.signup);

// API
router.get('/api/movies', moviesController.getAllMovies);
router.get('/api/users', usersController.getAllUsers);

// POST
router.post('/add-movie', moviesController.addMovie);
router.post('/add-user', usersController.addUser);

module.exports = router;
