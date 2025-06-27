import express from "express";
import { db, admin } from "../firebase.js";

const router = express.Router();

router.post("/teams", async (req, res) => {
  try {
    const { name, description, userUid } = req.body;

    if (!name || !userUid) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const teamRef = db.collection("teams").doc();

    await teamRef.set({
      name,
      description: description || "",
      createdBy: userUid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      members: [{ uid: userUid, role: "admin" }],
      memberUids: [userUid],
    });

    res.status(201).json({ message: "Team created", teamId: teamRef.id });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/teams", async (req, res) => {
  try {
    const userUid = req.query.userUid;

    if (!userUid) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const teamsRef = db.collection("teams");
    const snapshot = await teamsRef
      .where("memberUids", "array-contains", userUid)
      .get();

    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/teams/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { requesterUid } = req.body;

    if (!requesterUid) {
      return res.status(400).json({ message: "Missing requesterUid" });
    }

    const teamRef = db.collection("teams").doc(teamId);
    const teamDoc = await teamRef.get();

    if (!teamDoc.exists) {
      return res.status(404).json({ message: "Team not found." });
    }

    const teamData = teamDoc.data();
    const isAdmin = teamData.members?.some(
      (m) => m.uid === requesterUid && m.role === "admin"
    );

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Only team admins can delete team" });
    }

    await teamRef.delete();

    res.status(200).json({ message: "Team deleted successfuly" });
  } catch (err) {
    console.error("Error deleting team:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/teams/random-members", async (req, res) => {
  try {
    const snapshot = await db.collection("users").limit(5).get();

    const members = snapshot.docs.map((doc) => {
      const data = doc.data();
      const fullName =
        (data.firstName &&
          data.lastName &&
          `${data.firstName} ${data.lastName}`) ||
        data.firstName ||
        data.email?.split("@")[0] ||
        "Unnamed";

      return {
        id: doc.id,
        name: fullName,
        role: data.role || "Team Member",
        status: data.status || "offline",
        image: data.profileImage || null,
      };
    });

    res.status(200).json({ members });
  } catch (error) {
    console.error("Error fetching random members:", error);
    res.status(500).json({ error: "failed to fetch team members" });
  }
});

export default router;
