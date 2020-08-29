const authRouter = require('express').Router();
const { register, login, isVerified } = require('../controllers/auth');
const authorizeJWT = require('../middleware/authorizeJWT');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/is-verified', authorizeJWT, isVerified);

module.exports = authRouter;
