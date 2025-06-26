import { admin, db } from "../firebase.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.uid;
    const docRef = db.collection("dashboard").doc(userId);
    const doc = await docRef.get();

    const teamsSnapshot = await db
      .collection("teams")
      .where("memberUids", "array-contains", userId)
      .get();
    const totalTeams = teamsSnapshot.size;

    const personalTasksSnap = await db
      .collection("tasks")
      .where("createdBy", "==", userId)
      .get();

    const assignedTasksSnap = await db
      .collection("tasks")
      .where("assignedTo", "array-contains", userId)
      .get();

    const allTasksMap = new Map();

    personalTasksSnap.docs.forEach((doc) => {
      allTasksMap.set(doc.id, doc.data());
    });

    assignedTasksSnap.docs.forEach((doc) => {
      if (!allTasksMap.has(doc.id)) {
        allTasksMap.set(doc.id, doc.data());
      }
    });

    const allTasks = Array.from(allTasksMap.values());

    const pendingTasks = allTasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const completedTasks = allTasks.filter(
      (task) => task.status === "Completed"
    ).length;

    if (!doc.exists) {
      const defualtDashboard = {
        completedTasks,
        pendingTasks,
        totalTeams,
        totalProjects: 0,
        totalHoursLogged: 0,
        createdAt: new Date().toISOString(),
      };
      await docRef.set(defualtDashboard);
      return res.json({ dashbaord: defualtDashboard });
    }

    const data = doc.data();
    data.totalTeams = totalTeams;

    return res.json({
      dashboard: {
        ...doc.data(),
        totalTeams,
      },
    });
  } catch (e) {
    console.error("error fething dashboard:", e);
    return res.status(500).json({ error: "failed to fetch  dashboard" });
  }
};

export const savedDashbaord = async (req, res) => {
  try {
    const userId = req.user.uid;
    const dashboardData = req.body;
    await db
      .collection("dashboard")
      .doc(userId)
      .set(dashboardData, { merge: true });
    return res.json({ success: true });
  } catch (e) {
    console.error("error saving dashboard", e);
    return res.status(500).json({ error: "Failed to save dashboard" });
  }
};

export const addNewProject = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { projectName } = req.body;

    const projectRef = db.collection("projects").doc();
    await projectRef.set({
      name: projectName,
      createdAt: new Date().toISOString(),
      userId,
    });

    const dashboardRef = db.collection("dashboard").doc(userId);
    await dashboardRef.set(
      {
        totalProjects: admin.firestore.FieldValue.increment(1),
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
    return res
      .status(201)
      .json({ message: "Project created and dashboard updated successfully." });
  } catch (error) {
    console.error("Error adding project:", error);
    return res.json.status(500).json({ error: "Failed to add project." });
  }
};
