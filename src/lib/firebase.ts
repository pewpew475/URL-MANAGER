import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Firebase configuration - replace with your actual config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY || "your-api-key",
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

// For development, uncomment to use emulators
// if (process.env.NODE_ENV === 'development') {
//   import('firebase/auth').then(({ connectAuthEmulator }) => {
//     if (!auth.config.emulator) {
//       connectAuthEmulator(auth, 'http://localhost:9099');
//     }
//   });
//   import('firebase/firestore').then(({ connectFirestoreEmulator }) => {
//     if (!db._delegate._databaseId.projectId.includes('emulator')) {
//       connectFirestoreEmulator(db, 'localhost', 8080);
//     }
//   });
//   import('firebase/functions').then(({ connectFunctionsEmulator }) => {
//     if (!functions.app.options.projectId?.includes('emulator')) {
//       connectFunctionsEmulator(functions, 'localhost', 5001);
//     }
//   });
// }

export default app;