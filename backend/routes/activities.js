import express from "express";
import { db } from "../firebase";

const router = express.Router();

router.get("/activities", async (req, res) => {
  try {
    const snapshot = await db
      .collection("activities")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get();

    const activities = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

export default router;
