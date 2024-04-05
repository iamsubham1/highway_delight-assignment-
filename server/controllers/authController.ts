import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import nodemailer from 'nodemailer';
import generateUniqueOTP from '../utility/helpfunction';

require('dotenv').config();

interface SignUpData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
    },
  });

const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname }: SignUpData = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      email,
      password,
      firstname,
      lastname,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await user.save();

    // Generate OTP
    const otp = generateUniqueOTP();

    // Send OTP via email

    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to: email,
      subject: 'Your OTP for Account Activation',
      text: `Your OTP for account activation is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending OTP:', error);
        return res.status(500).json({ error: 'An error occurred while sending the OTP' });
      } else {
        console.log('OTP sent:', otp);
        return res.status(200).json({ message: 'User registered successfully. OTP sent for account activation.' });
      }
    });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).send('Server Error');
  }
};

export default signUpController;
 