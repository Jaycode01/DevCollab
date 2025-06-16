import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.get("/users/:uid/profile", async (req, res) => {
  const { uid } = req.params;

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user: userDoc.data() });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error." });
  }
});
