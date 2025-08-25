import * as admin from 'firebase-admin';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

// Initialize Firebase Admin
admin.initializeApp();

interface AdminRequestData {
  uid: string;
}

export const makeUserAdmin = onCall<AdminRequestData>(async (request) => {
  // Check if the request is authenticated
  if (!request.auth) {
    throw new HttpsError(
      'unauthenticated',
      'The function must be called while authenticated.'
    );
  }

  // Check if the caller is an admin
  const token = request.auth.token as { admin?: boolean };
  if (!token.admin) {
    throw new HttpsError(
      'permission-denied',
      'Only admins can make other users admin'
    );
  }

  const { uid } = request.data;
  
  // Check if the uid is provided
  if (!uid) {
    throw new HttpsError(
      'invalid-argument',
      'The function must be called with a uid'
    );
  }

  try {
    // Set the custom claim
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    
    // Optionally force token refresh
    await admin.auth().revokeRefreshTokens(uid);

    return { success: true, message: `Successfully made user ${uid} an admin` };
  } catch (error) {
    console.error('Error making user admin:', error);
    throw new HttpsError(
      'internal',
      'Error making user admin'
    );
  }
});
