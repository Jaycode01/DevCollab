import express from "express";
import admin from "firebase-admin";
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
      teamId = null,
    } = req.body;

    if (!name || !dueDate) {
      return res.status(400).json({ error: "Name and Due Date are required" });
    }

    const newTask = {
      name,
      description: description || "",
      dueDate,
      status,
      createdBy: userId,
      assignedTo,
      teamId,
      kind: teamId ? "team" : "personal",
      createdAt: new Date().toISOString(),
      updates: [
        {
          status,
          comment: "Task Created",
          updatedAt: new Date().toISOString(),
        },
      ],
    };

    const docRef = await db.collection("tasks").add(newTask);

    // Emit socket notification
    if (assignedTo && Array.isArray(assignedTo)) {
      assignedTo.forEach((uid) => {
        req.originalUrl.toLocaleLowerCase(uid).emit("notification", {
          message: `You've been assigned a new task: ${name}`,
          timestamp: new Date().toISOString(),
        });
      });
    }

    const userDoc = await db.collection("users").doc(userId).get();
    const userData = userDoc.data();

    const displayName =
      (userData?.firstName && userData.lastName
        ? `${userData.firstName} ${userData.lastName}`
        : userData?.firstName) ||
      userData?.email?.splt("@")[0] ||
      "Unnamed";

    await db.collection("activities").add({
      type: "task",
      action: "created",
      userId,
      username: displayName,
      taskId: docRef.id,
      message: `Created a new task: "${name}"`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

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

    const personalTasksSnapshot = await db
      .collection("tasks")
      .where("createdBy", "==", userId)
      .get();

    const teamTasksSnapshot = await db
      .collection("tasks")
      .where("assignedTo", "array-contains", userId)
      .get();

    const personalTasks = personalTasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const teamTasks = teamTasksSnapshot.docs
      .filter((doc) => doc.data().createdBy !== userId)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    const allTasks = [...personalTasks, ...teamTasks];

    const assignedUids = new Set();
    allTasks.forEach((task) => {
      const assigned = task.assignedTo || [];
      assigned.forEach((uid) => assignedUids.add(uid));
    });

    let formattedTasks = allTasks;

    if (assignedUids.size > 0) {
      const usersSnap = await db
        .collection("users")
        .where(
          admin.firestore.FieldPath.documentId(),
          "in",
          Array.from(assignedUids)
        )
        .get();

      let uidToNameMap = {};
      usersSnap.forEach((doc) => {
        const user = doc.data();
        const emailPrefix = user.email?.split("@")[0] || "Unknown";

        uidToNameMap[doc.id] =
          (user.firstName &&
            user.lastName &&
            `${user.firstName} ${user.lastName}`) ||
          user.firstName ||
          emailPrefix;
      });

      formattedTasks = allTasks.map((task) => {
        const assignedNames = (task.assignedTo || []).map(
          (uid) => uidToNameMap[uid] || uid
        );

        return {
          ...task,
          assignedTo: assignedNames,
        };
      });
    }

    res.status(200).json({ tasks: formattedTasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch tasks: I think server error" });
  }
});

router.patch("/tasks/:id", authenticateToken, async (req, res) => {
  const taskId = req.params.id;
  const { status, comment, name, description, dueDate } = req.body;

  try {
    const taskRef = db.collection("tasks").doc(taskId);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: "Task not found." });
    }

    const updates = {};

    if (status) {
      updates.status = status;
      updates.updatedAt = new Date().toISOString();
      updates.updates = admin.firestore.FieldValue.arrayUnion({
        comment: comment || "",
        status,
        updatedAt: new Date().toISOString(),
      });
    }

    if (name || description || dueDate) {
      if (name) updates.name = name;
      if (description) updates.description = description;
      if (dueDate) updates.dueDate = dueDate;
      updates.updatedAt = new Date().toISOString();
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid update fields provided." });
    }

    await taskRef.update(updates);

    res.status(200).json({ message: "Task updated successfully." });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.delete("/tasks/:id", authenticateToken, async (req, res) => {
  const taskId = req.params.id;

  try {
    const taskRef = db.collection("tasks").doc(taskId);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) {
      return res.status(404).json({ error: "task not found." });
    }

    if (taskDoc.data().createdBy !== req.user.uid) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this task." });
    }

    await taskRef.delete();
    res.status(200).json({ message: "task deleted successfully." });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ error: "Failed tp delete task." });
  }
});

router.get("/teams/user-teams", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const createdTemsSnap = await db
      .collection("teams")
      .where("createdBy", "==", userId)
      .get();

    const memberTeamsSnap = await db
      .collection("teams")
      .where("memberUids", "array-contains", userId)
      .get();

    const createdTeams = createdTemsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Filter out dupicates
    const memberTeams = memberTeamsSnap.docs
      .filter((doc) => doc.data().createdBy !== userId)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    const allTeams = [...createdTeams, ...memberTeams];

    res.status(200).json({ teams: allTeams });
  } catch (err) {
    console.error("Error fetching user teams:", err);
    res.status(500).json({ error: "Failed to fetch user teams." });
  }
});

router.get("/teams/:teamId/members", authenticateToken, async (req, res) => {
  try {
    const { teamId } = req.params;
    const teamDoc = await db.collection("teams").doc(teamId).get();

    if (!teamDoc.exists) {
      return res.status(404).json({ error: "Team nt found." });
    }

    const memberUids = teamDoc.data().memberUids || [];

    const usersSnapshot = await db
      .collection("users")
      .where(admin.firestore.FieldPath.documentId(), "in", memberUids)
      .get();

    const members = usersSnapshot.docs.map((doc) => {
      const user = doc.data();
      const emailPrefix = user.email?.split("@")[0] || "Unknown";

      const displayName =
        (user.firstName &&
          user.lastName &&
          `${user.firstName} ${user.lastName}`) ||
        user.firstName ||
        emailPrefix;

      return {
        uid: doc.id,
        displayName,
        email: user.email,
      };
    });

    res.status(200).json({ members });
  } catch (err) {
    console.error("error fetching team members:", err);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

export default router;
