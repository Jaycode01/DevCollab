export function sendNotification(io, userId, message) {
  const notification = {
    userId,
    message,
    timestamp: new Date().toISOString(),
  };

  req.db
    .collection("notifications")
    .add(notification)
    .catch((err) => console.error("Failed to store notification!", err));

  req.io.emit("notification", notification);
}
