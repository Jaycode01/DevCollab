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

// GET /api/projects - Get all projects for a user
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

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const projectId = req.params.id;

    const projectRef = db.collection("projects").doc(projectId);
    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return res.status(404).json({ error: "Project not found." });
    }

    const projectData = projectDoc.data();
    if (projectData.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only delete your own projects." });
    }

    await projectRef.delete();

    const dashRef = db.collection("dashboard").doc(userId);
    await dashRef.set(
      {
        totalProjects: admin.firestore.FieldValue.increment(-1),
      },
      { merge: true }
    );

    // Emit project deleted event
    req.io.emit("project:deleted", { id: projectId });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project." });
  }
});

export default router;
