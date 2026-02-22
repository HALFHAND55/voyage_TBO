import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No Token Provided" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (!decoded?.userId) {
      res.status(401).json({ message: "Unauthorized - Invalid Token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    (req as any).user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};