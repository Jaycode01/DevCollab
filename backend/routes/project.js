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
      imageUrl,
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

    req.io.emit("project:created", {
      id: projectRef.id,
      ...newProject,
    });

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

router.delete("/projects/:projectId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const projectId = req.params.projectId;

    const projectRef = db.collection("projects").doc(projectId);
    const projectDoc = await projectRef.get();

    if (!projectDoc.exists || projectDoc.data().userId !== userId) {
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized." });
    }
    await projectRef.delete();

    const dashRef = db.collection("dashboard").doc(userId);
    await dashRef.set(
      {
        totalProjects: admin.firestore.FieldValue.increment(-1),
      },
      {
        merge: true,
      }
    );

    req.io.emit("Project:deleted", { id: projectId });

    res.status(200).json({ success: true, message: "Projects deleted." });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project." });
  }
});

export default router;
