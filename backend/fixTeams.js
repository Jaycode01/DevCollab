import { db } from "./firebase.js";

async function fixmemberUids() {
  const teamSnapshot = await db.collection("teams").get();

  for (const doc of teamSnapshot.docs) {
    const data = doc.data();
    const memberUids = (data.members || []).map((m) => m.uid);
    await doc.ref.update({ memberUids });
    console.log(`Fixed team: ${doc.id}`);
  }

  console.log("All teams updated.");
}

fixmemberUids().catch(console.error);
