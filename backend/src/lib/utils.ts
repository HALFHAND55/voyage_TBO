import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (
  userId: string,
  res: Response
): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};