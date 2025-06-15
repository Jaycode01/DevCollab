import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.post("/teams/:teamId/remove-member", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { uid, requesterUid } = req.body;

    if (!uid || !requesterUid) {
      return res.status(400).json({ message: "Missing required fileds" });
    }

    const teamRef = db.collection("teams").doc(teamId);
    const teamDoc = await teamRef.get();

    if (!teamDoc.exists) {
      return res.status(404).json({ message: "Team not found." });
    }

    const teamData = teamDoc.data();
    const currentMembers = teamData.members || [];

    const requester = currentMembers.find((m) => m.uid === requesterUid);
    if (!requester || requester.role?.toLowerCase() !== "admin") {
      return res
        .status(403)
        .json({ message: "Only team admins can remove members." });
    }

    const member = currentMembers.find((m) => m.uid === uid);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.role?.toLowerCase() === "admin") {
      return res.status(403).json({ message: "Admin cannot be removed." });
    }

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

    res.status(200).json({ message: "Member removed successfully!" });
  } catch (err) {
    console.error("Error removing member:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
