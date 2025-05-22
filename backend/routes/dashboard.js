import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { db } from "../firebase.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const dashboardRef = db.collection("dashboard").doc(userId);
    const dashboardDoc = await dashboardRef.get();

    if (!dashboardDoc.exists) {
      await dashboardRef.set({
        totalProjects: 0,
        pendingTasks: 0,
        completedTasks: 0,
        teamMembers: 0,
        createdAt: new Date().toISOString(),
      });
      return res.status(201).json({
        message: "Dashboard created successfully!",
        dashboard: {
          totalProjects: 0,
          pendingTasks: 0,
          completedTasks: 0,
          teamMembers: 0,
        },
      });
    }

    return res.status(200).json({
      message: "Dashboard fetched",
      dashboard: dashboardDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
