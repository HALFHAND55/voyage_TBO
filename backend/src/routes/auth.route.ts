import { Router } from "express";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { vendorLogin, vendorLogout, vendorCheckAuth } from "../controllers/vendorAuth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { protectVendor } from "../middleware/vendorAuth.middleware.js";

const router = Router();

//user
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);

//vendor
router.post("/vendor/login", vendorLogin);
router.post("/vendor/logout", vendorLogout);
router.get("/vendor/check", protectVendor, vendorCheckAuth);

export default router;