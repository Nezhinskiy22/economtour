var express = require('express');
var exphbs = require('express-handlebars');
var expressHandlebarsSections = require('express-handlebars-sections');
var sassMiddleware = require('node-sass-middleware');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var apiv1 = require('./routes/apiV1');

var app = express();

// view engine setup
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    helpers: {
        section: expressHandlebarsSections()
    }
}));
app.set('view engine', 'hbs');

// sass compliler setup
app.use(
    sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/public',
        debug: true
    })
);


//browser-sync
if (app.get('env') == 'development1') {
    var browserSync = require('browser-sync');
    var config = {
        files: ['public/**/*.{js,css}', 'client/*.js', 'sass/**/*.scss', 'views/**/*.hbs'],
        logLevel: 'debug',
        logSnippet: false,
        reloadDelay: 3000,
        reloadOnRestart: true
    };
    var bs = browserSync(config);
    app.use(require('connect-browser-sync')(bs));
}

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// logging
switch (app.get('env')) {
    case 'development':
        // compact, colorful dev logging
        app.use(logger('dev'));
        break;
    case 'production':
        // module 'express-logger' supports daily log rotation
        app.use(require('express-logger')({ path: __dirname + '/log/requests.log' }));
        break;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'admin')));
app.use(express.static(path.join(__dirname, 'public')));

// database configuration
switch (app.get('env')) {
    case 'development':
        mongoose.connect('mongodb://127.0.0.1:27017/economtour', { useNewUrlParser: true });
        break;
    case 'production':
        mongoose.connect('mongodb://127.0.0.1:27017/economtour');
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}
mongoose.Promise = global.Promise;

app.use('/', index);
app.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname + '/admin/index.html'));
});
app.use('/api/v1', apiv1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;