var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConfig = require('./config/database.config');
var mongoose = require('mongoose');
const RoomController = require('./controllers/RoomController');
const MessageController = require('./controllers/MessageController');

//var roomsRouter = require('./routes/room');
//var messagesRouter = require('./routes/message');

var app = express();

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Databse Connected Successfully!!");
}).catch(err => {
  console.log('Could not connect to the database', err);
  process.exit();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/css", express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', roomsRouter);
//app.use('/message', messagesRouter);

app.get("/", RoomController.findAll);
app.post("/rooms", RoomController.create);

app.get("/rooms/:id", MessageController.findAll);
app.post("/rooms/:id/messages", MessageController.create);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
