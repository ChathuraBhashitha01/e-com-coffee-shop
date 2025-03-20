import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import User from '../model/User';
import bcrypt from 'bcryptjs';

dotenv.config();

const generateToken = (id: string): string => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '30d' }
    );
};

const UserController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, email, role, password } = req.body;

      if (!userName || !email || !role || !password) {
          res.status(400).json({ message: 'Please add all fields' });
          return;
      }

      const userExist = await User.findOne({ email });

      if (userExist) {
          res.status(400).json({ message: 'User already exists' });
          return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ userName:userName, email:email, role:role, password: hashedPassword });

      if (user) {
          res.status(201).json({message: 'User created successfully'  });
      } else {
          res.status(400).json({ message: 'Invalid user data' });
      }
  } catch (error) {
      next();
  }
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) =>{
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
          res.status(400).json({ message: 'Please add all fields' });
          return;
      }

      const user = await User.findOne({ email });

      if (!user) {
          res.status(409).json({ message: 'User not found' });
          return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          res.status(400).json({ message: 'Invalid password' });
          return;
      }

      res.status(200).json({
          userName: user.userName,
          isValidUser: true,
          token: generateToken(user.userName.toString()),
        });
    } catch (error) {
        next();
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
      }

      res.status(200).json(user);
  } catch (error) {
      next();
  }
  },
};

export default UserController;
