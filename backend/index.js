import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running...",
    status: "success",
  });

  app.use("/src/app/dashboard", dashboardRoutes);

  app.use("*", (req, res) => {
    console.log(`Routes not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.method} ${req.originalUrl}`,
      availableRoutes: ["GET /", "GET / src/app/dashboard"],
    });
  });

  app.listen(port, () => {
    console.log("Server is running on port ${port}");
    console.log("Available routes:");
    console.log(`- GET http://localhost:${port}/`);
    console.log(`- GET http://localhost:${port}/src/app/dashboard`);
  });
});
