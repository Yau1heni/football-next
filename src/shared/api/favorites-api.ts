import { db } from '@configs/firebase-config';
import { FAVORITES_COLLECTIONS, USERS_COLLECTIONS } from '@constants/firebase-collections';
import { favoritesFirestoreConverter } from '@utils/firebase-converter';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

const USERS_PATH = USERS_COLLECTIONS.PATH;
const FAVORITES_PATH = FAVORITES_COLLECTIONS.PATH;

export const favoritesApi = {
  getAllIds: async (userId: string): Promise<string[]> => {
    if (!userId) return [];
    const favoritesCollection = collection(db, USERS_PATH, userId, FAVORITES_PATH);
    const favoritesQuery = query(favoritesCollection);
    const convertedData = favoritesQuery.withConverter(favoritesFirestoreConverter);
    const favoritesSnapshot = await getDocs(convertedData);
    return favoritesSnapshot.docs.map((d) => d.id);
  },

  addFavorite: async (userId: string, clubId: string) => {
    await setDoc(doc(db, USERS_PATH, userId, FAVORITES_PATH, clubId), {
      clubId,
      addedAt: serverTimestamp(),
    });
  },

  removeFavorite: async (userId: string, clubId: string) => {
    await deleteDoc(doc(db, USERS_PATH, userId, FAVORITES_PATH, clubId));
  },
};
