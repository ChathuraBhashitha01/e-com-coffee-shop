import { Request, Response, NextFunction } from 'express';
import { generateAccessToken, generateRefreshToken ,verifyRefreshToken } from "../util/jwtUtils";
import dotenv from 'dotenv';
import User from '../model/User';
import bcrypt from 'bcryptjs';


dotenv.config();

// const generateToken = (id: string): string => {
//     return jwt.sign(
//         { id },
//         process.env.JWT_SECRET || 'default_secret',
//         { expiresIn: '30d' }
//     );
// };

const UserController = {

    getAllUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
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
