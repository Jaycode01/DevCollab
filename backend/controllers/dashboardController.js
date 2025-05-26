import { admin, db } from "../firebase.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.uid;
    const docRef = db.collection("dashboard").doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      const defualtDashboard = {
        completedTasks: 0,
        pendingTasks: 0,
        teamMembers: 0,
        totalProjects: 0,
        createdAt: new Date().toISOString(),
      };
      await docRef.set(defualtDashboard);
      return res.json({ dashbaord: defualtDashboard });
    }

    return res.json({ dashboard: doc.data() });
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

export const addNewProjet = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { projectName } = req.body;

    const projectRef = db.collection("projects").doc();
    await projectRef.set({
      name: projectName,
      createdAt: new Date().toISOString(),
      userId,
    });

    const dashboardRef = db.collaction("dashboard").doc(userId);
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
