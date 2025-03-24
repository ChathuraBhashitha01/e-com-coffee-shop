import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../util/jwtUtils";

export interface AuthRequest extends Request {
  user?: { userName: string};
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token:any = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Access Denied" });
  } 

  const decoded = verifyAccessToken(token);
  if (!decoded) {
    res.status(401).json({ message: "Invalid Token" });
  } 

  // req.user = decoded;
  next();
};
