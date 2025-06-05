import { db } from "./firebase.js";

async function migrateOtificationsToNotifications() {
  try {
    const oldCollection = db.collection("otifications");
    const newCollection = db.collection("notifications");

    const snapshot = await oldCollection.get();
    const batch = db.batch();

    snapshot.forEach((doc) => {
      const data = doc.data();
      const newDocRef = newCollection.doc(doc.id);
      batch.set(newDocRef, data);
    });

    await batch.commit();
    console.log("Migration completed.");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrateOtificationsToNotifications();
