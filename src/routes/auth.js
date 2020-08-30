const authRouter = require('express').Router();
const { register, login, logout, isVerified } = require('../controllers/auth');
const authorizeJWT = require('../middleware/authorizeJWT');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', authorizeJWT, logout);
authRouter.get('/is-verified', authorizeJWT, isVerified);

module.exports = authRouter;
