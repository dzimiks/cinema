const express = require('express');
const router = express.Router();

const moviesController = require('../services/movies/src/controllers/moviesController');
const usersController = require('../services/users/src/controllers/usersController');

// Setting layout for all "user" requests to main layout, and passing control to next handler
router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'layout';
    next();
});

// GET movies
/**
 * @swagger
 * /:
 *   get:
 *    tags:
 *        - Movies
 *     description: Returns all movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of movies
 */
router.get('/', moviesController.getMovies);

/**
 * @swagger
 * /movies/name:
 *   get:
 *     tags:
 *       - Movies
 *     name: Find movie
 *     summary: Finds a movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required:
 *           - name
 *     responses:
 *       '200':
 *         description: A single movie object
 */
router.get('/movies/:url', moviesController.getMovie);

/**
 * @swagger
 * /edit-movie/id:
 *   put:
 *     tags:
 *       - Movies
 *     name: Edit movie
 *     summary: Edit a movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: body
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: Edited movie
 */
router.get('/edit-movie/:id', moviesController.editMovie);

/**
 * @swagger
 * /movies/name:
 *   put:
 *     tags:
 *       - Movies
 *     name: Delete movie
 *     summary: Deletes a movie
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: Deleted movie
 */
router.get('/delete-movie/:id', moviesController.deleteMovie);

// GET users


/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
router.get('/signin', usersController.signin);

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User created
 *       '403':
 *         description: Username or email already taken
 */
router.get('/signup', usersController.signup);

/**
 * @swagger
 * /profile:
 *   post:
 *     tags:
 *       - Users
 *     name: Profile
 *     summary: User profile
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User profile
 */
router.get('/profile', usersController.profile);

// API

/**
 * @swagger
 * /api/movies:
 *   get:
 *    tags:
 *        - Movies
 *     description: Returns all movies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of movies
 */
router.get('/api/movies', moviesController.getAllMovies);

/**
 * @swagger
 * /api/users:
 *   get:
 *    tags:
 *        - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 */
router.get('/api/users', usersController.getAllUsers);

// POST
/**
 * @swagger
 * /add-movie:
 *   post:
 *     tags:
 *       - Movies
 *     name: Add movie
 *     summary: Add new movie
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *     properties:
 *       url: string
 *       title: string
 *       genre: string
 *       description: string
 *       actors: array
 *       duration: number
 *     responses:
 *       '200':
 *         description: Movie successfully added
 */
router.post('/add-movie', moviesController.addMovie);
/**
 * @swagger
 * /add-user:
 *   post:
 *     tags:
 *       - Users
 *     name: Add user
 *     summary: Add new user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *         properties:
 *           first_name:
 *             type: string
 *           last_name:
 *             type: string
 *           username:
 *             type: string
 *           email:
 *             type: string
 *           password:
 *             type: string
 *             format: password
 *     responses:
 *       '200':
 *         description: User successfully addedgit
 */
router.post('/add-user', usersController.addUser);

module.exports = router;
