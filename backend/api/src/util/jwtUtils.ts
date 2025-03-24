import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

interface UserPayload {
  userName: string;
}

export const generateAccessToken = (user: UserPayload): string => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
};

export const generateRefreshToken = (user: UserPayload): string => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as UserPayload;
  } catch (error) {
    return null;
  }
};
