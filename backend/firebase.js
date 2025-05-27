import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const credentialsJSON = process.env.GOOGLE_CREDENTIALS;

if (!credentialsJSON) {
  throw new Error("Missing GOOGLE_CREDENTIALS in .env");
}

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { admin, db };
