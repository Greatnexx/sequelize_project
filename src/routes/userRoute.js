import express from 'express';
import { login } from '../controllers/Users/authController.js';
import { register } from '../controllers/Users/createCustomer.js';
import { validateLogin, validateRegister } from '../services/validation.js';

const router = express.Router();

router.post('/register',validateRegister, register);
router.post('/login',validateLogin, login);

export default router;
