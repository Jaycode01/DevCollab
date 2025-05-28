import express from "express";
import { db, admin } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/projects", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const { name, url, description, imageUrl } = req.body;

    if (!name || !url || !description || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Missing required project fields." });
    }

    const newProject = {
      name,
      url,
      description,
      imageUrl,
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

router.get("/projects", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection("projects")
      .where("userId", "==", userId)
      .get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects." });
  }
});

export default router;
