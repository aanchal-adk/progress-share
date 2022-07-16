import express from 'express';
import userController from '../controllers/user.controller';
import UserController from '../controllers/user.controller';

const router = express.Router();

// signup route
router.post('/user', UserController.createUser);

// email confirmation route
router.get('/confirmation-code/:token', userController.confirmUserEmail);

module.exports = router;
