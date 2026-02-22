import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protectVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.vendor_jwt;

    if (!token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string; role: string };

    if (decoded.role !== "vendor") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!vendor) {
      res.status(401).json({ message: "Vendor not found" });
      return;
    }

    (req as any).vendor = vendor;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};