import { db } from '@configs/firebase-config';
import { ARTICLES_COLLECTIONS } from '@constants/firebase-collections';
import { SORT_DIRECTIONS } from '@constants/sort-direction';
import type { Article, ArticleFirestore } from '@shared-types/articles.types';
import { articlesFirestoreConverter } from '@utils/firebase-converter';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  startAfter,
} from 'firebase/firestore';

const ARTICLES_PATH = ARTICLES_COLLECTIONS.PATH;

export const ARTICLES_PAGE_SIZE = 5;

export type GetArticlesResult = {
  articles: Article[];
  /** Id последнего документа (для курсора пагинации, сериализуемый). */
  lastDocId: string | null;
  hasMore: boolean;
};

const mapArticleFromFirestore = (docData: ArticleFirestore): Article => ({
  ...docData,
  timestamp: docData.timestamp?.toMillis?.() ?? 0,
});

export const articlesApi = {
  getAll: async (
    pageSize: number = ARTICLES_PAGE_SIZE,
    startAfterDocId?: string | null
  ): Promise<GetArticlesResult> => {
    const articlesRef = collection(db, ARTICLES_PATH).withConverter(articlesFirestoreConverter);

    const queryConstraints: QueryConstraint[] = [
      orderBy(ARTICLES_COLLECTIONS.FIELD_PATH.TIMESTAMP, SORT_DIRECTIONS.DESC),
      limit(pageSize),
    ];
    if (startAfterDocId) {
      const lastDocRef = doc(db, ARTICLES_PATH, startAfterDocId).withConverter(
        articlesFirestoreConverter
      );
      const lastDocSnap = await getDoc(lastDocRef);
      if (lastDocSnap.exists()) {
        queryConstraints.push(startAfter(lastDocSnap));
      }
    }
    const q = query(articlesRef, ...queryConstraints);

    const snapshot = await getDocs(q);

    const articles: Article[] = snapshot.docs.map((d) =>
      mapArticleFromFirestore({ ...d.data(), id: d.id })
    );
    const lastDocId = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;
    const hasMore = snapshot.docs.length === pageSize;

    return { articles, lastDocId, hasMore };
  },
};
