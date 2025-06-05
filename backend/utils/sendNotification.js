import { io } from "../index.js";
import { db } from "../firebase.js";

export async function sendNotification(path, userId, message) {
  const notification = {
    userId,
    path,
    message,
    timestamp: new Date().toISOString(),
  };

  io.to(userId).emit("notification", notification);

  await db.collection("notifications").add(notification);
}
