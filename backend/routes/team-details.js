import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.get("/teams/:teamId/details", async (req, res) => {
  try {
    const { teamId } = req.params;

    const teamDoc = await db.collection("teams").doc(teamId).get();
    if (!teamDoc.exists) {
      return res.status(404).json({ message: "Team not found." });
    }

    const teamData = teamDoc.data();
    const creatorUid = teamData.createdBy;

    const userDoc = await db.collection("users").doc(creatorUid).get();
    let creatorName = "Unknown";

    if (userDoc.exists) {
      const user = userDoc.data();
      if (user.firstName) {
        creatorName = user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName;
      } else if (user.email) {
        creatorName = user.email.split("@")[0];
      }
    }

    return res.status(200).json({
      id: teamId,
      name: teamData.name,
      description: teamData.description || "",
      createdAt: teamData.createdAt || null,
      creatorName,
      members: teamData.members || [],
      memberCount: teamData.members?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching team details:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
