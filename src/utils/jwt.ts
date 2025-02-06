import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { JwtPayload } from "../types";

export const createJwtToken = (payload: JwtPayload, expireTime?: string): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: expireTime ?? process.env.JWT_EXPIRATION,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
}