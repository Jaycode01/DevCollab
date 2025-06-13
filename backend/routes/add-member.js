import express from "express";
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

    const currentMembers = teamData.members || [];

    const isAlreadyMember = currentMembers.some((m) => m.uid === userId);
    if (isAlreadyMember) {
      return res.status(409).json({ message: "User already added." });
    }

    const updatedMembers = [...(teamData.members || []), { uid: userId, role }];
    const updatedUids = new Set([...(teamData.memberUids || []), userId]);

    await teamRef.update({
      members: updatedMembers,
      memberUids: Array.from(updatedUids),
    });

    res.status(200).json({ message: "Member added successfully!" });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/teams/:teamId/members", async (req, res) => {
  try {
    const { teamId } = req.params;

    const teamRef = db.collection("teams").doc(teamId);
    const teamDoc = await teamRef.get();

    if (!teamDoc.exists) {
      return res.status(404).json({ message: "Team not found." });
    }

    const teamData = teamDoc.data();
    const members = teamData.members || [];

    const memberDetails = await Promise.all(
      members.map(async (member) => {
        const userDoc = await db.collection("users").doc(member.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          let name = "";
          if (userData.firstName && userData.lastName) {
            name = `${userData.firstName} ${userData.lastName}`;
          } else if (userData.firstName) {
            name = userData.firstName;
          } else if (userData.email) {
            name = userData.email.split("@")[0];
          } else {
            name = "Unnamed";
          }

          return {
            uid: member.uid,
            role: member.role,
            name,
            email: userData.email,
            photoURL: userData.photoURL || null,
          };
        } else {
          return null;
        }
      })
    );

    const filteredMembers = memberDetails.filter((m) => m !== null);

    res.status(200).json({ members: filteredMembers });
  } catch (err) {
    console.error("Error fetching team members:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
