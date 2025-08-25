import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  increment,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { URLData, ShortenUrlResponse } from '@/types';

const URLS_COLLECTION = 'urls';
const ANALYTICS_COLLECTION = 'analytics';

// Generate unique short code
const generateShortCode = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Validate URL format
const isValidUrl = (url: string): boolean => {
  const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
  return urlPattern.test(url) && url.length <= 2048;
};

export const shortenUrl = async (originalUrl: string): Promise<ShortenUrlResponse> => {
  if (!isValidUrl(originalUrl)) {
    throw new Error('Invalid URL format');
  }

  // Check if URL already exists
  const existingQuery = query(
    collection(db, URLS_COLLECTION),
    where('originalUrl', '==', originalUrl),
    where('isActive', '==', true)
  );
  
  const existingDocs = await getDocs(existingQuery);
  
  if (!existingDocs.empty) {
    const existingDoc = existingDocs.docs[0];
    const data = existingDoc.data() as URLData;
    return {
      success: true,
      shortCode: data.shortCode,
      shortUrl: `${window.location.origin}/${data.shortCode}`,
      originalUrl: data.originalUrl
    };
  }

  // Generate unique short code
  let shortCode = generateShortCode();
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    const codeQuery = query(
      collection(db, URLS_COLLECTION),
      where('shortCode', '==', shortCode)
    );
    const codeDocs = await getDocs(codeQuery);
    
    if (codeDocs.empty) {
      isUnique = true;
    } else {
      shortCode = generateShortCode();
      attempts++;
    }
  }

  if (!isUnique) {
    throw new Error('Failed to generate unique short code');
  }

  // Create URL document
  const urlData = {
    originalUrl,
    shortCode,
    visitCount: 0,
    createdAt: Timestamp.now(),
    isActive: true
  };

  await addDoc(collection(db, URLS_COLLECTION), urlData);

  return {
    success: true,
    shortCode,
    shortUrl: `${window.location.origin}/${shortCode}`,
    originalUrl
  };
};

export const getOriginalUrl = async (shortCode: string): Promise<string | null> => {
  const urlQuery = query(
    collection(db, URLS_COLLECTION),
    where('shortCode', '==', shortCode),
    where('isActive', '==', true)
  );
  
  const querySnapshot = await getDocs(urlQuery);
  
  if (querySnapshot.empty) {
    return null;
  }

  const urlDoc = querySnapshot.docs[0];
  const urlData = urlDoc.data() as URLData;
  
  // Update visit count and last visited
  await updateDoc(urlDoc.ref, {
    visitCount: increment(1),
    lastVisited: Timestamp.now()
  });

  // Log analytics
  await addDoc(collection(db, ANALYTICS_COLLECTION), {
    shortCode,
    visitTimestamp: Timestamp.now(),
    referrer: document.referrer || '',
    userAgent: navigator.userAgent
  });

  return urlData.originalUrl;
};

export const getAllUrls = async (): Promise<URLData[]> => {
  const urlsQuery = query(
    collection(db, URLS_COLLECTION),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(urlsQuery);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    lastVisited: doc.data().lastVisited?.toDate()
  })) as URLData[];
};

export const deleteUrl = async (shortCode: string): Promise<void> => {
  const urlQuery = query(
    collection(db, URLS_COLLECTION),
    where('shortCode', '==', shortCode)
  );
  
  const querySnapshot = await getDocs(urlQuery);
  
  if (!querySnapshot.empty) {
    const urlDoc = querySnapshot.docs[0];
    await updateDoc(urlDoc.ref, {
      isActive: false
    });
  }
};