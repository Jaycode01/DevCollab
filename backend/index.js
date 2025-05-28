import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import dashboardRoutes from "./routes/dashboard.js";
import projectRoutes from "./routes/project.js";
import notificationRoutes from "./routes/notifications.js";

dotenv.config({ path: "./.env" });

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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New Client connected:", socket.id);

  socket.on("diconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running rn...",
  });
});

app.use("/dashboard", dashboardRoutes);
app.use("/api", projectRoutes);
app.use("/api", notificationRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
