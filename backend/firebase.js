import admin from "firebase-admin";
import fs from "fs";
import path from "path";

let serviceAccount;

try {
  // Try to read the service account key file
  const serviceAccountPath = path.resolve("./serviceAccountKey.json");
  console.log(`Looking for service account key at: ${serviceAccountPath}`);

  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
    console.log("Service account key found and parsed successfully");
  } else {
    console.log("Service account key file not found");
    throw new Error("Service account key file not found");
  }
} catch (error) {
  console.error(`Error reading service account key: ${error.message}`);

  // Check if we have environment variables for Firebase credentials
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_CLIENT_EMAIL
  ) {
    console.log("Using Firebase credentials from environment variables");

    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };
  } else {
    console.warn(
      "No Firebase credentials found. Using mock data for development."
    );
  }
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase Admin initialized with service account");
    } else {
      // Initialize with a mock app for development
      admin.initializeApp({
        projectId: "mock-project-id",
      });
      console.log("Firebase Admin initialized with mock configuration");
    }
  } catch (error) {
    console.error(`Firebase initialization error: ${error.message}`);
  }
}

// Get Firestore database
const db = admin.firestore();

// Create a mock implementation for development if needed
if (!serviceAccount) {
  console.log("Setting up mock Firestore implementation");

  // Mock data
  const mockData = {
    projects: [
      { id: "p1", userId: "user123", name: "Project 1" },
      { id: "p2", userId: "user123", name: "Project 2" },
      { id: "p3", userId: "user123", name: "Project 3" },
    ],
    tasks: [
      { id: "t1", userId: "user123", projectId: "p1", status: "pending" },
      { id: "t2", userId: "user123", projectId: "p1", status: "completed" },
      { id: "t3", userId: "user123", projectId: "p2", status: "pending" },
      { id: "t4", userId: "user123", projectId: "p2", status: "pending" },
      { id: "t5", userId: "user123", projectId: "p3", status: "completed" },
    ],
    users: [
      { id: "user123", name: "Current User" },
      { id: "user456", name: "Team Member 1" },
      { id: "user789", name: "Team Member 2" },
    ],
    teams: [
      {
        id: "team1",
        name: "Team 1",
        members: ["user123", "user456", "user789"],
      },
    ],
  };

  // Override the collection method to return our mock data
  db.collection = (collectionName) => {
    return {
      where: (field, operator, value) => {
        return {
          get: async () => {
            // Filter the mock data based on the query
            const filteredData = mockData[collectionName].filter((item) => {
              if (operator === "==") {
                return item[field] === value;
              } else if (operator === "array-contains") {
                return (
                  Array.isArray(item[field]) && item[field].includes(value)
                );
              }
              return false;
            });

            // Return the filtered data as a snapshot
            return {
              size: filteredData.length,
              docs: filteredData.map((item) => ({
                id: item.id,
                data: () => item,
              })),
              forEach: (callback) =>
                filteredData.forEach((item) => {
                  callback({
                    id: item.id,
                    data: () => item,
                  });
                }),
            };
          },
        };
      },
      get: async () => {
        // Return all data in the collection
        return {
          size: mockData[collectionName].length,
          docs: mockData[collectionName].map((item) => ({
            id: item.id,
            data: () => item,
          })),
          forEach: (callback) =>
            mockData[collectionName].forEach((item) => {
              callback({
                id: item.id,
                data: () => item,
              });
            }),
        };
      },
    };
  };
}

export { admin, db };
