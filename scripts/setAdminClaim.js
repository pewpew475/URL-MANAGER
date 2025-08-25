import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(
  await readFile(new URL('../service-account-key.json', import.meta.url))
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// The UID of the user you want to make admin
const uid = '0r2eAw4jCWcbKa9SGO70d1eGnsg1'; // Replace this with your user's UID

// Make user an admin
async function makeUserAdmin(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Successfully made user ${uid} an admin`);
    process.exit();
  } catch (error) {
    console.error('Error making user admin:', error);
    process.exit(1);
  }
}

makeUserAdmin(uid);
