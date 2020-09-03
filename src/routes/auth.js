const authRouter = require('express').Router();
const { register, login, logout, isVerified } = require('../controllers/auth');
const authorizeJWT = require('../middleware/authorizeJWT');
const rateLimiter = require('../middleware/rateLimiter');

authRouter.post('/register', rateLimiter, register);
authRouter.post('/login', rateLimiter, login);
authRouter.post('/logout', authorizeJWT, logout);
authRouter.get('/is-verified', authorizeJWT, isVerified);

module.exports = authRouter;
