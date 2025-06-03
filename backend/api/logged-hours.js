import express from "express";
import { db, admin } from "../firebase";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/logged-hours", authenticateToken, async (req, res) => {
  try {
    const userid = req.user.uid;
    const { duration } = req.body;

    if (!duration || typeof duration !== "number") {
      return res.status(400).json({ error: "Invalid duration" });
    }

    const now = new Date();
    const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });

    const docRef = db.collection("loggedHours").doc(userid);
    await docRef.set(
      {
        [dayOfWeek]: admin.firestore.FieldValue.increment(duration),
      },
      { merge: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error logging usage:", error);
    res.status(500).json({ error: "Failed to log usage" });
  }
});

export default router;
