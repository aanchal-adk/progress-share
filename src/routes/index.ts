import express from 'express';
import authenticate from '../middlewares/auth';
import UserController from '../controllers/user.controller';
import TrackerController from '../controllers/tracker.controller';
import CheckInController from '../controllers/checkin.controller';

const router = express.Router();

// signup route
router.post('/signup', UserController.createUser);

// email confirmation route
router.get('/confirmation-code/:token', UserController.confirmUserEmail);

// signin route
router.post('/login', UserController.login);

//generate new access token from refresh token
router.post('/refresh-token', UserController.refreshToken);

router.get('/user-info', authenticate, UserController.getUserInfo);

router.get('/my-trackers', authenticate, TrackerController.fetchMyTrackers);

router.get('/my-tracker-w-checkin', authenticate, TrackerController.fetchMyTrackersWCheckin);

router.post('/new-tracker', authenticate, TrackerController.addNewTracker);

router.post('/add-checkin', authenticate, CheckInController.addCheckin);

module.exports = router;
