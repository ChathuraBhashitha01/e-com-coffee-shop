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

    getAllUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (error) {
            next();
        }
    },

    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
        const { username, name, role, password } = req.body;

        if (!username || !name || !role || !password) {
            res.status(400).json({ message: 'Please add all fields' });
            return;
        }

        const userExist = await User.findOne({ userName: username });

        if (userExist) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ userName:username, name:name, role:role, password: hashedPassword });

        if (user) {
            res.status(201).json({
                username: user.userName,
                role: user.role,
                token: generateToken(user.userName.toString()),});
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        next();
    }
    },


    deleteUser: async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const username = req.params.username;

            const isItemExist = await User.findOne({userName: username})
            if(!isItemExist){
                res.status(404).json({message:"Item not found"});
            }

            const item = await User.findOneAndDelete();
            if(item){
                res.status(200).json({message:"Item removed successfully"});
            } 
        } catch (error) {
            next(error);
        }
    },

    loginUser: async (req: Request, res: Response, next: NextFunction) =>{
        try {
        const  username = req.params.username;
        const password = req.params.password;
        
        if (!username || !password) {
            res.status(400).json({ message: 'Please add all fields' });
            return;
        }

        const user = await User.findOne({ userName:username });

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
            username: user.userName,
            role: user.role,
            token: generateToken(user.userName.toString()),
            });
        } catch (error) {
            next();
        }
    },

    getUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
        const user = await User.findById(req.params.username);

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
