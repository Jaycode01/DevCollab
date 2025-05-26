import { db } from "../firebase.js";

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
