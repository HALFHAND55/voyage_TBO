import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

interface VendorLoginBody {
  email: string;
  password: string;
}

const generateVendorToken = (vendorId: string, res: Response): void => {
  const token = jwt.sign(
    { id: vendorId, role: "vendor" },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.cookie("vendor_jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // dev only
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const vendorLogin = async (
  req: Request<{}, {}, VendorLoginBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const vendor = await prisma.vendor.findUnique({
      where: { email },
    });

    if (!vendor || !vendor.isActive) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      vendor.passwordHash
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    generateVendorToken(vendor.id, res);

    res.status(200).json({
      _id: vendor.id,
      name: vendor.name,
      email: vendor.email,
    });
  } catch (error) {
    console.error("Error in vendorLogin controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const vendorLogout = (
  _req: Request,
  res: Response
): void => {
  try {
    res.cookie("vendor_jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in vendorLogout controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const vendorCheckAuth = (
  req: Request,
  res: Response
): void => {
  try {
    res.status(200).json(req.vendor);
  } catch (error) {
    console.error("Error in vendorCheckAuth controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};