import express from "express";
import dotenv from "dotenv";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import { initSocket } from "./lib/socket";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.status(200).json({ status: "API running" });
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // adjust if needed
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Production static serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});