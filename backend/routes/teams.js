import express, { json } from "express";
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

    await db.collection("activities").add({
      type: "team",
      action: "created",
      userId: userUid,
      teamId: teamRef.id,
      message: `Created a new task: "${name}"`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
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

    await db.collection("activities").add({
      type: "team",
      action: "deleted",
      userId: requesterUid,
      teamId,
      message: `Deleted the team: "${teamData.name}"`,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Team deleted successfuly" });
  } catch (err) {
    console.error("Error deleting team:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.get("/teams/random-app-users", async (req, res) => {
  try {
    const { userUid } = req.query;

    if (!userUid) {
      return res.status(400).json({ error: "Missing userUid" });
    }

    const allUsersSnap = await db.collection("users").get();

    const otherUsers = allUsersSnap.docs
      .filter((doc) => doc.id !== userUid)
      .map((doc) => {
        const user = doc.data();
        const displayName =
          (user.firstName &&
            user.lastName &&
            `${user.firstName} ${user.lastName}`) ||
          user.firstName ||
          user.email?.split("@"[0]) ||
          "Unnamed";

        return {
          id: doc.id,
          name: displayName,
          role: user.bio || "DevCollab User",
          status: user.status || "offline",
          image: user.imageURL || null,
        };
      });

    if (otherUsers.length === 0) {
      return res.status(200).json({ appUsers: [] });
    }

    const shuffled = otherUsers.sort(() => 0.5 - Math.random());
    const randomUsers = shuffled.slice(0, 5);

    res.status(200).json({ appUsers: randomUsers });
  } catch (error) {
    console.error("Error fetching random users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

export default router;
