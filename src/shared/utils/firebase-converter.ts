import type { Club } from '@shared-types/clubs.types';
import type { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

const createFirestoreConverter = <T>() => ({
  toFirestore: (item: T) => ({ ...item }),
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>, options?: SnapshotOptions) => {
    const data = snapshot.data(options);
    return { ...data, id: snapshot.id };
  },
});

export const clubsFirestoreConverter = createFirestoreConverter<Club>();
export const favoritesFirestoreConverter = createFirestoreConverter<{ clubId: string }>();
