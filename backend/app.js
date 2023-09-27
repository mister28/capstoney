const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

mongoose.connect('mongodb+srv://young89:mny76ers@cluster0.cvee3vd.mongodb.net/ChirpSite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

// require('./middleware/auth');

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/profile', passport.authenticate('jwt', {session: false}), secureRoute);

app.use('/api', indexRouter);

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
});

app.listen(3099)

module.exports = app;
