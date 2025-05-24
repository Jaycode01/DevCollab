import admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load your Firebase service account key (download from Firebase console)
const serviceAccount = JSON.parse(
  readFileSync(resolve("./serviceAccountKey.json"), "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { admin, db };
