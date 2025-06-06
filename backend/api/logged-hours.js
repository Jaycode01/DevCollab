import express from "express";
import { db, admin } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";
import { sendNotification } from "../utils/sendNotification.js";

const router = express.Router();

router.post("/logged-hours", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { duration } = req.body;

    if (!duration || typeof duration !== "number") {
      return res.status(400).json({ error: "Invalid duration" });
    }

    await db.collection("loggedHours").add({
      userId,
      duration,
      timestamp: admin.firestore.Timestamp.now(),
    });

    const dashboardRef = db.collection("dashboard").doc(userId);
    await dashboardRef.set(
      {
        totalHoursLogged: admin.firestore.FieldValue.increment(duration),
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );

    sendNotification(
      req.originalUrl,
      userId,
      `You logged ${duration} minutes successfully.`
    );

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
      .orderBy("timestamp", "desc")
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

router.get("/total-hours", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection("loggedHours")
      .where("userId", "==", userId)
      .get();

    let totalMinutes = 0;
    snapshot.forEach((doc) => {
      const { duration } = doc.data();
      if (typeof duration === "number") {
        totalMinutes += duration;
      }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    res.json({ hours, minutes, totalMinutes });
  } catch (error) {
    console.error("Error calculating total hours logged:", error);
    res.status(500).json({ error: "Failed to calculate total hours" });
  }
});

export default router;
