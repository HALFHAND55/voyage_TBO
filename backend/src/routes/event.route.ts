import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getHostActiveEventDashboard } from "../controllers/event.controller.js";

const router = Router();

router.get("/:eventId/dashboard", protectRoute, getHostActiveEventDashboard);

export default router;