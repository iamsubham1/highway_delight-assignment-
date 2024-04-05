import express from 'express'
const router = express.Router();
import { body } from 'express-validator';

import {signUpController,loginController,verifyOTPController }from '../controllers/authController';

router.post('/signup', [
    body('email', 'Enter a valid email').exists().isEmail(),
    body('password', 'The password must include a digit and should be of atleast 8 digits').isLength({ min: 8 }).matches(/\d/),

], signUpController);


router.post('/login', [
    body('password', 'Password cannot be empty').exists(),
], loginController);

router.post('/verifyotp',  verifyOTPController);
export default router