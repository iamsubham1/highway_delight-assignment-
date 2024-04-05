import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import jwt from "jsonwebtoken";

import nodemailer from 'nodemailer';
import generateUniqueOTP from '../utility/helpfunction';

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1); // Exit the process or handle the error appropriately
  }
  
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
var otp:string;
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
     otp = generateUniqueOTP();

  
    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to: email,
      subject: 'Your OTP for Account Activation',
      text: `Your OTP for account activation is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log('Error sending OTP:', error);
        return res.status(500).json({ error: 'An error occurred while sending the OTP' });
      } else {
        console.log('OTP sent:', otp);
        return res.status(200).json({ message: 'User registered successfully. OTP sent for account activation.' });
      }
    });
  } catch (err:any) {
    console.error('Error registering user:', err.message);
    res.status(500).send('Server Error');
  }
};

const loginController = async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string, password: string } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      // Check if the password is correct
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const data = {

        email: user.email,
    }

    //create token and save email in it
      const JWT = jwt.sign(data, JWT_SECRET);

      return res.status(200).json({ success: true, JWT });
  
    } catch (err: any) {
      console.error('Error logging in:', err.message);
      res.status(500).send('Server Error');
    }
  };
  
const verifyOTPController = async (req: Request, res: Response) => {
    try {
      const { email, receivedOtp }: { email: string, receivedOtp: string } = req.body;
  
    console.log("recived otp :",receivedOtp, "otp sent",otp)
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
     
      if (receivedOtp.toString() !==  otp.toString()) {
        return res.status(400).json({ msg: 'Invalid OTP' });
      }
  
    
      res.status(200).json({ msg: 'OTP verified successfully' });
  
    } catch (err: any) {
      console.error('Error verifying OTP:', err.message);
      res.status(500).send('Server Error');
    }
  };
  
  export { signUpController, loginController, verifyOTPController };