import express from "express";
import { db } from "../firebase.js";
import { messaging } from "firebase-admin";

const router = express.Router();

router.post("/teams/:teamId/remove-member", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "Missing userID" });
    }

    const teamRef = db.collection("teams").doc(teamId);
    const teamDoc = await teamRef.get();

    if (!teamDoc.exists) {
      return res.status(404).json({ message: "Team not found." });
    }

    const teamData = teamDoc.data();

    const updateMembers = (teamData.members || []).filter(
      (member) => member.uid !== uid
    );

    const updatedMemberUids = (teamData.memberUids || []).filter(
      (id) => id !== uid
    );

    await teamRef.update({
      members: updateMembers,
      memberUids: updatedMemberUids,
    });

    req.status(200).json({ message: "Member removed successfully!" });
  } catch (err) {
    console.error("Error removing member:", err);
    res.status(500).json({ message: "Server error" });
  }
});
