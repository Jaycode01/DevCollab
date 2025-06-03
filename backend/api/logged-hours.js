import express from "express";
import { db, admin } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/logged-hours", authenticateToken, async (req, res) => {
  console.log("Incoming request body:", req.body);
  console.log("User UID", req.user?.uid);
  try {
    const userid = req.user.uid;
    const { duration } = req.body;

    if (!duration || typeof duration !== "number") {
      return res.status(400).json({ error: "Invalid duration" });
    }

    await db.collection("loggedHours").add({
      userId,
      duration,
      timestamp: admin.firestore.Timestamp.now(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error logging usage:", error);
    res.status(500).json({ error: "Failed to log usage" });
  }
});

router.get("/logged-hours", authenticateToken, async (req, res) => {
  try {
    const uid = req.user.uid;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const snapshot = await db
      .collection("loggedHours")
      .where("userId", "==", uid)
      .where("timestamp", ">=", admin.firestore.Timestamp.fromDate(startOfWeek))
      .orderBy("_name_", "desc")
      .get();

    const logsByDay = {};
    snapshot.forEach((doc) => {
      const { timestamp, duration } = doc.data();
      const date = timestamp.toDate();
      const day = date.toLocaleDateString("en-US", { weekday: "long" });

      if (!logsByDay[day]) logsByDay[day] = 0;
      logsByDay[day] += duration;
    });

    const fullWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const logs = fullWeek.map((day) => {
      const totalMinutes = logsByDay[day] || 0;
      return {
        day,
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
      };
    });

    const todayIndex = new Date().getDay();
    let streak = 0;
    for (let i = todayIndex; i >= 0; i--) {
      const log = logs[i];
      if (log.hours > 0 || log.minutes > 0) {
        streak++;
      } else {
        break;
      }
    }

    res.json({ logs, streak });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
