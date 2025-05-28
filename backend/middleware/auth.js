import { admin } from "../firebase.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const idToken = authHeader.replace(/^Bearer\s+/i, "");

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded token uid:", decodedToken.uid);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error.code, error.message);
    return res.status(401).json({ error: "Invalid Firebase token" });
  }
};
