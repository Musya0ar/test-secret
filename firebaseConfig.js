const admin = require("firebase-admin");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
require("dotenv").config();

// Initialize Secret Manager Client
const secretClient = new SecretManagerServiceClient();

// Function to fetch the Firebase Admin SDK JSON from Secret Manager
async function getFirebaseKey() {
  const [version] = await secretClient.accessSecretVersion({
    name: `projects/${process.env.GCP_PROJECT_ID}/secrets/firebase-key/versions/latest`,
  });
  return JSON.parse(version.payload.data.toString("utf8"));
}

// Initialize Firebase
async function initializeFirebase() {
  const serviceAccount = await getFirebaseKey();

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

initializeFirebase().catch((err) => {
  console.error("Error initializing Firebase:", err);
  process.exit(1); // Exit the app if Firebase fails to initialize
});

const db = admin.firestore();

module.exports = { admin, db };
