import express from 'express';
import { google, signin, signup, signout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);

export default router;
