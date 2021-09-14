import express from 'express';
import UserControllers from './controllers/user';
import MatchController from './controllers/match';
import RegistrationController from './controllers/registration';

// import { auth } from './middleware/auth';

const router = express.Router();

router.post('/signUp', UserControllers.signUp);
router.post('/signIn', UserControllers.signIn);
router.post('/createMatch', MatchController.createMatch);
router.get('/getAllMatches/:userId', MatchController.getAllMatches);

router.post('/confirmPresence', RegistrationController.confirmPresence);
router.post('/removePresence', RegistrationController.removePresence);
router.get('/getMyMatches/:user', RegistrationController.getMyMatches);

export default router;