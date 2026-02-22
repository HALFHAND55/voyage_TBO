import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

interface SignupBody {
  fullName: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}


export const signup = async (
  req: Request<{}, {}, SignupBody>,
  res: Response
): Promise<void> => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
      return;
    }

    const existingUser = await prisma.user.findUnique({where: { email },});

    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: email.split("@")[0], // temporary until frontend sends username
        fullName,
        email,
        passwordHash: hashedPassword,
      },
    });

    generateToken(newUser.id, res);

    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    generateToken(user.id, res);

    res.status(200).json({
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (
  _req: Request,
  res: Response
): void => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (
  req: Request,
  res: Response
): void => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};