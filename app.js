var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConfig = require('./config/database.config');
var mongoose = require('mongoose');
const RoomController = require('./controllers/RoomController');
var AuthMiddleware = require('./middlewares/AuthMiddleware');

var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');

if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()

var roomsRouter = require('./routes/room');
var messagesRouter = require('./routes/message');
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');
var initializePassport = require('./config/passport.config');
var app = express();

initializePassport(passport);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const cors = require('cors');
app.use("/css", express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRouter); // login, register
app.use('/api', apiRouter); // no auth

app.use(AuthMiddleware); // check user authenticated

// general routes
app.get("/", RoomController.findAll);
app.use('/rooms', roomsRouter);
app.use('/messages', messagesRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
