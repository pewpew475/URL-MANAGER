import { functions } from '../lib/firebase';
import { httpsCallable } from 'firebase/functions';

export const makeUserAdmin = async (uid: string): Promise<void> => {
  try {
    const makeAdminFunction = httpsCallable(functions, 'makeUserAdmin');
    const result = await makeAdminFunction({ uid });
    console.log('Make admin result:', result.data);
  } catch (error) {
    console.error('Error making user admin:', error);
    throw error;
  }
};
