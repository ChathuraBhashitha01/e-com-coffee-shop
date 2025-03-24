import { Request, Response, NextFunction } from 'express';
import { generateAccessToken, generateRefreshToken ,verifyRefreshToken } from "../util/jwtUtils";
import dotenv from 'dotenv';
import User from '../model/User';
import bcrypt from 'bcryptjs';

const authController = {
    loginUser: async (req: Request, res: Response, next: NextFunction) =>{
      try {
        const  {userName,password} = req.body;
        
        if (!userName || !password) {
            res.status(400).json({ message: 'Please add all fields' });
            return;
        }

        const userDetails = await User.findOne({ userName:userName });

        if (!userDetails) {
            res.status(409).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, userDetails.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        const user = { userName };
        
        const accessToken =  generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        if (userDetails) {
            res.status(201).json({
                username: userDetails.userName,
                role: userDetails.role,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }else {
            res.status(400).json({ message: 'Invalid user data' });
        };
      } catch (error) {
          next();
      }
    },
    signinUser: async (req: Request, res: Response, next: NextFunction) =>{
      try {
        const { userName, name, role, password } = req.body;

        if (!userName || !name || !role || !password) {
            res.status(400).json({ message: 'Please add all fields' });
            return;
        }

        const userExist = await User.findOne({ userName: userName });

        if (userExist) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userDetails = await User.create({ userName:userName, name:name, role:role, password: hashedPassword });
        const user = { userName };
        
        const accessToken =  generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        if (userDetails) {
            res.status(201).json({
                username: userDetails.userName,
                role: userDetails.role,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
        }else {
            res.status(400).json({ message: 'Invalid user data' });
        }
      } catch (error) {
          next();
      }
    },
    refechUser: async (req: Request, res: Response, next: NextFunction) =>{
      try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
          res.status(401).json({ message: "Refresh token required" });
        } 

        const decoded:any = verifyRefreshToken(refreshToken);
        if (!decoded) {
          res.status(403).json({ message: "Invalid refresh token" });
        } 

        const newAccessToken = generateAccessToken({ userName: decoded.userName});
        res.status(200).json({ accessToken: newAccessToken });
      } catch (error) {
        next(error)
      }
    },
};

export default authController;
