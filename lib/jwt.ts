import { JwtPayload } from "@/types";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const signAccessToken = (userId: string) => {
  const accessTokenSecret = process.env.JWT_ACCESS_SECRET as Secret;
  const options: SignOptions = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES as SignOptions["expiresIn"],
  };
  return jwt.sign({ userId }, accessTokenSecret, options);
};

export const signRefreshToken = (userId: string) => {
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET as Secret;
  const options: SignOptions = {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES as SignOptions["expiresIn"],
  };
  return jwt.sign({ userId }, refreshTokenSecret, options);
};

export const verifyAccessToken = (token: string) => {
  const accessTokenSecret = process.env.JWT_ACCESS_SECRET as Secret;
  return jwt.verify(token, accessTokenSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET as Secret;
  return jwt.verify(token, refreshTokenSecret) as JwtPayload;
};
