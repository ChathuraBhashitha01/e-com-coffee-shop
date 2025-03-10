import mongoose, { Document, Schema } from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import User from '../model/User';
import { Error } from 'mongoose';

dotenv.config();

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const UserController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
   try{

   } catch (error) {

    }
  },

  loginUser: async (req: Request, res: Response, next: NextFunction) =>{
    try {
     
    } catch (error) {

    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
     
    } catch (error) {

    }
  },
};

export default UserController;
