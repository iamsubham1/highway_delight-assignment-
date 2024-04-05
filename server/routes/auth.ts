import { sign } from 'crypto';
import express from 'express'
const router = express.Router();

router.post('/signup' , signUpController);
module.exports = router