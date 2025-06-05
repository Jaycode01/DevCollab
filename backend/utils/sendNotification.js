import { io } from "../index.js";

export function sendNotification(path, userId, message) {
  const notification = {
    userId,
    path,
    message,
    timestamp: new Date().toISOString(),
  };

  io.emit("notification", notification);
}
