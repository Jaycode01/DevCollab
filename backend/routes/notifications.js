import express from "express";
import { db } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/notifications", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection("notifications")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
