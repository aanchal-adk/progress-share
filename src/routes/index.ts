import express from 'express';
import authenticate from '../middlewares/auth';
import UserController from '../controllers/user.controller';
import TrackerController from '../controllers/tracker.controller';

const router = express.Router();

// signup route
router.post('/signup', UserController.createUser);

// email confirmation route
router.get('/confirmation-code/:token', UserController.confirmUserEmail);

// signin route
router.post('/login', UserController.login);

//generate new access token from refresh token
router.post('/refresh-token', UserController.refreshToken);

router.get('/my-trackers', authenticate, TrackerController.fetchMyTrackers);

module.exports = router;
