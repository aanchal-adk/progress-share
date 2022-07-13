import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();

// signup route
router.post('/user', UserController.createUser);


module.exports = router;
