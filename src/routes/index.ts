import express from 'express';
import userController from '../controllers/user.controller';
import UserController from '../controllers/user.controller';

const router = express.Router();

// signup route
router.post('/signup', UserController.createUser);

// email confirmation route
router.get('/confirmation-code/:token', userController.confirmUserEmail);

// signin route
router.post('/login', UserController.login);

//generate new access token from refresh token
router.post('/refresh-token', UserController.refreshToken);

module.exports = router;
