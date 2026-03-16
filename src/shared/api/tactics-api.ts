import { db } from '@configs/firebase-config';
import { USERS_COLLECTIONS } from '@constants/firebase-collections';
import { MAX_SAVED_TACTICS } from '@constants/tactics';
import type {
  SavedTacticDetail,
  SavedTacticListItem,
  SaveTacticsPayload,
} from '@shared-types/tactics.types';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

const USERS_PATH = USERS_COLLECTIONS.PATH;
const TACTICS_PATH = USERS_COLLECTIONS.SUBCOLLECTIONS.TACTICS;

/**
 * Сохраняет схему тактики в подколлекцию users/{userId}/tactics.
 * Документ создаётся с автогенерируемым id, в поле createdAt пишется serverTimestamp.
 */
export const tacticsApi = {
  save: async (userId: string, payload: SaveTacticsPayload): Promise<string> => {
    const tacticsRef = collection(db, USERS_PATH, userId, TACTICS_PATH);
    const docRef = await addDoc(tacticsRef, {
      name: payload.name,
      formationId: payload.formationId,
      players: payload.players,
      drawingStrokes: payload.drawingStrokes,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  /**
   * Возвращает список сохранённых тактик пользователя (id, name, createdAt), по дате создания (новые первые).
   * Загружается не более MAX_SAVED_TACTICS схем.
   */
  getAll: async (userId: string): Promise<SavedTacticListItem[]> => {
    if (!userId) return [];
    const tacticsRef = collection(db, USERS_PATH, userId, TACTICS_PATH);
    const q = query(tacticsRef, orderBy('createdAt', 'desc'), limit(MAX_SAVED_TACTICS));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: (data.name as string) ?? '',
        createdAt: data.createdAt as SavedTacticListItem['createdAt'],
      };
    });
  },

  /**
   * Возвращает полный документ тактики по id (для применения на доску).
   */
  getById: async (userId: string, tacticId: string): Promise<SavedTacticDetail | null> => {
    if (!userId || !tacticId) return null;
    const docRef = doc(db, USERS_PATH, userId, TACTICS_PATH, tacticId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: (data.name as string) ?? '',
      formationId: (data.formationId as string) ?? '',
      players: (data.players as SaveTacticsPayload['players']) ?? [],
      drawingStrokes: (data.drawingStrokes as SaveTacticsPayload['drawingStrokes']) ?? [],
      createdAt: data.createdAt,
    };
  },

  /**
   * Удаляет сохранённую тактику по id.
   */
  remove: async (userId: string, tacticId: string): Promise<void> => {
    if (!userId || !tacticId) return;
    const docRef = doc(db, USERS_PATH, userId, TACTICS_PATH, tacticId);
    await deleteDoc(docRef);
  },
};
