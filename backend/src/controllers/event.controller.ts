import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getHostActiveEventDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const eventId = String(req.params.eventId);

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        creatorId: user.id,
        status: "ACTIVE"   // only ACTIVE events
      },
      include: {
        location: true,
        operations: {
          include: {
            finalizedVendor: true,
            vendors: true,
            allocations: {
              include: {
                inventoryItem: true,
                vendor: true
              }
            }
          }
        }
      }
    });

    if (!event) {
      return res.status(404).json({ message: "Active event not found" });
    }

    let estimatedTotal = 0;

    for (const op of event.operations) {
      const accepted = op.vendors.find(
        (v) => v.status === "ACCEPTED"
      );

      if (accepted?.negotiatedAmount) {
        estimatedTotal += accepted.negotiatedAmount;
      }
    }

    return res.json({
      event,
      estimatedTotal
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ message: "Failed to load dashboard" });
  }
};