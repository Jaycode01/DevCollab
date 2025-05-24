import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { db } from "../firebase.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const docRef = db.collection("dashboard").doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      // If no dashboard exists, create a default one
      const defaultDashboard = {
        completedTasks: 0,
        pendingTasks: 0,
        teamMembers: 0,
        totalProjects: 0,
        createdAt: new Date().toISOString(),
      };
      await docRef.set(defaultDashboard);
      return res.json({ dashboard: defaultDashboard });
    }

    return res.json({ dashboard: doc.data() });
  } catch (e) {
    console.error("Error fetching dashboard:", e);
    return res.status(500).json({ error: "Failed to fetch dashboard" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const dashboardData = req.body;
    await db
      .collection("dashboard")
      .doc(userId)
      .set(dashboardData, { merge: true });
    return res.json({ success: true });
  } catch (e) {
    console.error("Error saving dashboard:", e);
    return res.status(500).json({ error: "Failed to save dashboard" });
  }
});

export default router;
