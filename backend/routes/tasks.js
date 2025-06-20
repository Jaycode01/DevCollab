import express from "express";
import { db } from "../firebase.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/tasks", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const {
      name,
      description,
      dueDate,
      status = "In Progress",
      assignedTo = null,
    } = req.body;

    if (!name || !dueDate) {
      return res.status(400).json({ error: "Name ad Due Date are required" });
    }

    const newTask = {
      name,
      description: description || "",
      dueDate,
      status,
      createdBy: userId,
      assignedTo,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("tasks").add(newTask);

    res.status(201).json({
      message: "Task created successfully",
      task: { id: docRef.id, ...newTask },
    });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task." });
  }
});

router.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection("tasks")
      .where("createdBy", "==", userId)
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch tasks: I think server error" });
  }
});

export default router;
