import express from "express";
import { db, admin } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/projects", authenticateToken, async (req, res) => {
  console.log("Incoming project body:", req.body);
  try {
    const userId = req.user.uid;
    const { name, url, description } = req.body;

    if (!name?.trim() || !url?.trim() || !description?.trim()) {
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

    const projectRef = await db.collection("projects").add(newProject);

    const dashRef = db.collection("dashboard").doc(userId);
    await dashRef.set(
      {
        totalProjects: admin.firestore.FieldValue.increment(1),
      },
      { merge: true }
    );

    // Assuming req.io is your socket instance, if not remove this
    if (req.io) {
      req.io.emit("notify", {
        message: `New project created: ${newProject.name}`,
        userId,
      });
    }

    res.status(201).json({
      success: true,
      project: {
        id: projectRef.id,
        ...newProject,
      },
    });
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
