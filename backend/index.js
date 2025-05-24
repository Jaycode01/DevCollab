import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://devcollab-eight.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running rn...",
  });
});

app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
