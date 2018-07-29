const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const sassMiddleware = require('node-sass-middleware');
const subdomain = require('express-subdomain');
const session = require('express-session');
const csrf = require('csurf');
const RateLimit = require('express-rate-limit');
const compression = require('compression');


//router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const builderRouter = require('./routes/builder');


const apiRouter = require('./routes/api/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layout/layout.hbs' });
app.set('view engine', 'hbs');

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

const limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 10000000, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);
app.use(compression())
app.use(session({
    secret: 'mySecretCookieSalt',
    key: 'myCookieSessionId',
    resave:true,
    saveUninitialized : true,
    cookie: {
        httpOnly: true,
        secure: true,
        expires: new Date( Date.now() + 60 * 60 * 1000 )
    }
}));
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf());
app.use(function(req, res, next){
    // Expose constiable to templates via locals
    res.locals.csrftoken = req.csrfToken();
    next();
});


app.use(subdomain('api', apiRouter));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/builder', builderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
