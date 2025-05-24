import { admin } from "../firebase.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader); // Debug log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error); // This will now run
    return res.status(401).json({ error: "Invalid Firebase token" });
  }
};
