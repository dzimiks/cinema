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

/**
 * @swagger
 * definitions:
 *   Movie:
 *     properties:
 *       url:
 *         type: string
 *       title:
 *         type: string
 *       genre:
 *         type: string
 *       description:
 *         type: string
 *       actors:
 *         type: array
 *       duration:
 *         type: integer
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       email:
 *         type: integer
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       isBanned:
 *         type: boolean
 *       banHistory:
 *         type: array
 *       status:
 *         type: Status
 *       reservationNubmer:
 *         type: integer
 *       required:
 *         - email
 *         - username
 *         - password
 */

/**
 * @swagger
 * /movies/url:
 *   get:
 *     tags:
 *       - movies
 *     description: Returns one movie
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A single movie object
 *         schema:
 *           $ref: '#/definitions/Movie'
 */
router.get('/movies/:url', moviesController.getMovie);

/**
 * @swagger
 * /edit-movie/id:
 *   get:
 *     tags:
 *       - movies
 *     description: Edit movie
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Movie edited
 *         schema:
 *           $ref: '#/definitions/Movie'
 */
router.get('/edit-movie/:id', moviesController.editMovie);


/**
 * @swagger
 * /delete-movie/id:
 *   delete:
 *     tags:
 *       - movies
 *     description: Deletes a single movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: movie's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         schema:
 *           $ref: '#/definitions/Movie'
 */
router.get('/delete-movie/:id', moviesController.deleteMovie);

// GET users


/**
 * @swagger
 * /signin:
 *   get:
 *     tags:
 *       - users
 *     description: Returns user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User found and logged in successfully
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/signin', usersController.signin);

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.get('/signup', usersController.signup);

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *       - users
 *     description: Returns user's profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User's profile loaded
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/profile', usersController.profile);

// API

/**
 * @swagger
 * /api/movies:
 *   get:
 *     tags:
 *       - movies
 *     description: Returns all movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of movies
 *         schema:
 *           $ref: '#/definitions/Movie'
 */
router.get('/api/movies', moviesController.getAllMovies);
router.get('/api/reservations', reservationsController.getAllReservations);

// /**
//  * @swagger
//  * /api/users:
//  *   get:
//  *    tags:
//  *        - Users
//  *     description: Returns all users
//  *     produces:
//  *       - application/json
//  *     responses:
//  *       200:
//  *         description: An array of users
//  */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/api/users', usersController.getAllUsers);

// POST

/**
 * @swagger
 * /add-movie:
 *   post:
 *     tags:
 *       - movies
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: movie
 *         description: movie object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Movie'
 *     responses:
 *       200:
 *         description: Movie successfully added
 */
router.post('/add-movie', moviesController.addMovie);
router.post('/make-reservation', reservationsController.makeReservation);

/**
 * @swagger
 * /add-user:
 *   post:
 *     tags:
 *       - users
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/add-user', usersController.addUser);

module.exports = router;
