import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.post("/teams/:teamId/edit", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, description, requesterUid } = req.body;

    if (!requesterUid) {
      return res.status(400).json({ message: "Missing requesterUid" });
    }

    const teamRef = db.collection("teams").doc(teamId);
    const teamDoc = await teamRef.get();

    if (!teamDoc.exists) {
      return res.status(404).json({ message: "Team not found." });
    }

    const teamData = teamDoc.data();
    const members = teamData.members || [];

    const requester = members.find((m) => m.uid === requesterUid);
    if (!requester || requester.role?.toLowerCase() !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can edit team details." });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;

    if (Object.keys(updates).length == 0) {
      return res.status(400).json({ message: "Nothing to update." });
    }

    await teamRef.update(updates);

    res.status(200).json({ message: "team details updated successfully." });
  } catch (err) {
    console.error("Error updating team:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
