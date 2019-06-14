const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

// Connecting to mongo
// const dbURI = process.env.MONGO_URL || 'mongodb://localhost/cinema_movies';
// mongoose.connect(dbURI);

// Initializing mongo and passport
require('./src/services/movies/src/models/db');
require('./src/services/users/src/models/db');

// Setting routers
const mainRouter = require('./src/routes/mainRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);

// Session and user management
// app.use(session({
// 	secret: 'dzimiks',
// 	resave: false,
// 	saveUninitialized: false,
// 	store: new MongoStore({mongooseConnection: mongoose.connection}),
// 	cookie: {maxAge: 14 * 24 * 60 * 60 * 1000}
// }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
