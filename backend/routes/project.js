import express from "express";
import { db, admin } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/projects", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const { name, url, description } = req.body;

    if (!name || !url || !description) {
      return res
        .status(400)
        .json({ error: "Missing required project fields." });
    }

    const newProject = {
      name,
      url,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId,
    };
    await db.collection("projects").add(newProject);

    const dashRef = db.collection("dashboard").doc(userId);
    await dashRef.set(
      {
        totalProjects: admin.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );

    res
      .status(201)
      .json({ success: true, message: "project created successfully." });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Failed to create project." });
  }
});

router.get("/projects", (req, res) => {
  res.json({ message: "The backed route to get the projects" });
});

export default router;
