import express, { json } from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.post("/teams/:teamId/add-member", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { email, role } = req.body;

    if (!email || !role || !teamId) {
      return res
        .status(400)
        .json({ message: "Missing some required fields/details" });
    }

    const userRef = db.collection("users");
    const userSnapshot = await userRef
      .where("email", "==", email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res
        .status(404)
        .json({ message: "User not found with this email." });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;

    const teamRef = db.collection("teams").doc(teamId);
    const teamDoc = await teamRef.get();

    if (!teamDoc.exists) {
      return res.status(404).json({ message: "Team not found." });
    }

    const teamData = teamDoc.data();

    const isAlreadyMember = teamData.memberUids?.includes(userId);
    if (isAlreadyMember) {
      return res
        .status(409)
        .json({ message: "User is already a team member." });
    }

    await teamRef.update({
      members: [...(teamData.members || []), { uid: userId, role }],
      memberUids: [...(teamData.memberUids || []), userId],
    });

    res.status(200).json({ message: "Member added successfully!" });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
