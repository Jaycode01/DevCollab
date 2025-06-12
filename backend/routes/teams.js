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
      memberUids: [userUid], //Makes it easy to query later
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
      return res
        .status(400)
        .json({ message: "Missing UserUid or You're not logged In" });
    }

    const teamsRef = db.collection("teams");
    const snapshot = await teamsRef.where("createdBy", "==", userUid).get();

    if (!snapshot || !snapshot.docs) {
      console.error("Firestore returned an invalid snaphot:", snapshot);
      return res.status(500).json({ mesage: "Invalid Firestore response" });
    }

    if (snapshot.empty) {
      return res.status(200).json({ teams: [] });
    }

    const teams = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.sendStatus(200).json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
