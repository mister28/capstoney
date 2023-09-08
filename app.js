var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors')
var app = express();

mongoose.connect('mongodb+srv://young89:mny76ers@cluster0.cvee3vd.mongodb.net/ChirpSite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error.ejs');
});

app.listen(3099, console.log("listening"))

module.exports = app;
