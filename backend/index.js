import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Health check route (for your server status check)
app.get("/", (req, res) => {
  res.json({ message: "Backend is running..." });
});

app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
