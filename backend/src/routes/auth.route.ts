import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = new Router();

// Register a new user
router.route('/register').post(AuthController.register);

// Login a user
router.route('/login').post(AuthController.login);

export default router;
