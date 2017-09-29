const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const handler = require('request-handler');

const User = require('../db/models/user');
const Product = require('../db/models/product');

app.use(bodyParser.json());
bodyParser.urlencoded({extended: true});

// authentication using passport local
app.use(session({
  secret: 'not so secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

// This is supposed to prevent CORS errors
app.use((req, res, next) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 next();
});


app.listen(PORT, (req, res) => {
  console.log('listening on port ', PORT);
});

// handle signup, login, and lgout
app.post('/signup', handler.signUpUser);
app.post('/login', handler.logInUser);
app.post('/logout', handler.logOutUser);
