// Middleware for verifying JWT tokens on the server
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// Set up JWT secret
const jwtSecret = 'secretToken';

// Middleware to authenticate routes using JWT tokens
const requireAuth = expressJwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
});

module.exports = { requireAuth };