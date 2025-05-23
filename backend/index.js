import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Default test route
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running...",
    status: "success",
  });
});

// ✅ FIXED route path
app.use("/dashboard", dashboardRoutes);

// 404 fallback
app.use("*", (req, res) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    availableRoutes: ["GET /", "GET /dashboard"],
  });
});

// ✅ START SERVER (make sure this is NOT inside any route)
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
