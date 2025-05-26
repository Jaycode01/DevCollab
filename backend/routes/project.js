import express from "express";
import { db } from "../firebase.js";
import { admin } from "../firebase.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/projects", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const newProject = req.body;

    await db.collection("projects").add({
      ...newProject,
      userId,
    });

    const dashRef = db.collection("dashboard").doc(userId);
    await dashRef.set(
      {
        totalProjects: admin.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );

    res.status(201).json({ success: true, message: "project created." });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Failed to create project." });
  }
});

export default router;
