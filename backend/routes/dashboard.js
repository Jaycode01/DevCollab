import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { db } from "../firebase.js";

const router = express.Router();

// GET /src/app/dashboard
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Get the user ID from the authenticated token
    const userId = req.user.uid;
    console.log(`Fetching dashboard data for user: ${userId}`);

    // Initialize dashboard data object
    const dashboardData = {
      totalProjects: 0,
      pendingTasks: 0,
      completedTasks: 0,
      teamMembers: 0,
    };

    // 1. Get total projects count
    const projectsSnapshot = await db
      .collection("projects")
      .where("userId", "==", userId)
      .get();

    dashboardData.totalProjects = projectsSnapshot.size;
    console.log(`Total projects: ${dashboardData.totalProjects}`);

    // 2. Get tasks counts (pending and completed)
    const tasksSnapshot = await db
      .collection("tasks")
      .where("userId", "==", userId)
      .get();

    // Count pending and completed tasks
    tasksSnapshot.forEach((doc) => {
      const task = doc.data();
      if (task.status === "pending") {
        dashboardData.pendingTasks++;
      } else if (task.status === "completed") {
        dashboardData.completedTasks++;
      }
    });

    console.log(`Pending tasks: ${dashboardData.pendingTasks}`);
    console.log(`Completed tasks: ${dashboardData.completedTasks}`);

    // 3. Get team members count
    // This could be from a teams collection, project members, or collaborators
    const teamsSnapshot = await db
      .collection("teams")
      .where("members", "array-contains", userId)
      .get();

    // Get unique team members across all teams
    const teamMembers = new Set();

    for (const teamDoc of teamsSnapshot.docs) {
      const team = teamDoc.data();
      if (team.members && Array.isArray(team.members)) {
        team.members.forEach((member) => teamMembers.add(member));
      }
    }

    dashboardData.teamMembers = teamMembers.size || 1; // At least the user themselves
    console.log(`Team members: ${dashboardData.teamMembers}`);

    // Return the dashboard data
    res.json({
      success: true,
      dashboard: dashboardData,
      message: "Dashboard data retrieved successfully",
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard data",
      error: error.message,
    });
  }
});

// Alternative implementation if your data model is different
router.get("/alt", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Initialize counters
    let totalProjects = 0;
    let pendingTasks = 0;
    let completedTasks = 0;
    let teamMembers = 0;

    // Batch get all the data we need
    const [projectsSnapshot, tasksSnapshot, usersSnapshot] = await Promise.all([
      db.collection("projects").where("userId", "==", userId).get(),
      db.collection("tasks").where("userId", "==", userId).get(),
      db.collection("users").get(),
    ]);

    // Count projects
    totalProjects = projectsSnapshot.size;

    // Count tasks by status
    tasksSnapshot.forEach((doc) => {
      const task = doc.data();
      if (task.status === "pending") {
        pendingTasks++;
      } else if (task.status === "completed") {
        completedTasks++;
      }
    });

    // Count team members (all users except the current user)
    teamMembers = usersSnapshot.size - 1;

    const dashboardData = {
      totalProjects,
      pendingTasks,
      completedTasks,
      teamMembers: teamMembers > 0 ? teamMembers : 0,
    };

    res.json({
      success: true,
      dashboard: dashboardData,
      message: "Dashboard data retrieved successfully",
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard data",
      error: error.message,
    });
  }
});

export default router;
