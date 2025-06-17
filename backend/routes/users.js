import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.get("/users/:uid/profile", async (req, res) => {
  const { uid } = req.params;

  try {
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.data();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      user: {
        name: `${userData.firstName} ${userData.lastName || ""}`,
        email: userData.email,
        bio: userData.bio || "",
        github: userData.githubUrl || "",
        linkedin: userData.linkedinUrl || "",
        twitter: userData.twitterUrl || "",
        phone: userData.tel || "",
        website: userData.websiteUrl || "",
      },
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;
