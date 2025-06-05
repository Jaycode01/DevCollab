import express from "express";
import { db } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/notifications", authenticateToken, async (req, res) => {
  const userId = req.user.uid;

  try {
    const snapshot = await db
      .collection("notifications")
      .where("userId", "==", userId)
      .orderBy("timestamp", "desc")
      .limit(50)
      .get();

    const notifications = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
