import { admin } from "../firebase.js";

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    // For development without a real Firebase project
    if (
      process.env.NODE_ENV === "development" &&
      !process.env.FIREBASE_PROJECT_ID
    ) {
      console.log("Development mode: Skipping token verification");
      // Mock user for development
      req.user = {
        uid: "user123",
        email: "dev@example.com",
        name: "Development User",
      };
      return next();
    }

    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
      error: err.message,
    });
  }
}
