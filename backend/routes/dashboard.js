import express from "express";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    // const userId = req.user.uid;

    const dashboardData = {
      totalProjects: 12,
      pendingTasks: 8,
      completedTasks: 4,
      teamMembers: 6,
    };

    res.json({
      success: true,
      dashboard: dashboardData,
      message: "Dashboard data retrieved successfully",
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard data",
      errorr: error.message,
    });
  }
});

export default router;
