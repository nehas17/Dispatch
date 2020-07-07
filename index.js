const express = require('express')
const app = express();
const path = require('path');
// const flash = require('connect-flash');
const { COOKIE_KEY } = require('./config/constants');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors')




app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));// for post data
app.use(cookieParser(''));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: COOKIE_KEY,
  resave: false,
  saveUninitialized: true
}));

// app.use(flash());

require('./config/routes')(app);
app.listen(5000, () => {
  console.log('Started')
});