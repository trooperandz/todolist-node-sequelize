'use strict';

const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      exphbs = require('express-handlebars'),
      hbs = require('hbs'),
      indexRouter = require('./routes/indexRouter'),
      tasksRouter = require('./routes/tasksRouter'),
      usersRouter = require('./routes/usersRouter');

const app = express();

// Session setup
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // Note: change to true when https is enabled
  cookie: { secure: false },
  // Note: change to true when user is logged in.  Used for app access rules.
  authenticated: false,
}));

// Configure view engine
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
}));
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Load routes
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
