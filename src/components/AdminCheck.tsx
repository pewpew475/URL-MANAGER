import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';

export function AdminCheck() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Force token refresh to get the latest claims
        if (auth.currentUser) {
          await auth.currentUser.getIdToken(true);
          const token = await auth.currentUser.getIdTokenResult();
          setIsAdmin(!!token.claims.admin);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdmin();
  }, []);

  if (loading) {
    return <div>Checking admin status...</div>;
  }

  return (
    <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc' }}>
      <h2>Admin Status Check</h2>
      <p>Current user: {auth.currentUser?.email}</p>
      <p>Admin status: {isAdmin ? '✅ Is Admin' : '❌ Not Admin'}</p>
      {!isAdmin && auth.currentUser && (
        <p style={{ color: 'orange' }}>
          If you were just made admin, please sign out and sign back in to get admin privileges.
        </p>
      )}
    </div>
  );
}
