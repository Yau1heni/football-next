import { db } from '@configs/firebase-config';
import { ARTICLES_COLLECTIONS } from '@constants/firebase-collections';
import { SORT_DIRECTIONS } from '@constants/sort-direction';
import type {
  Article,
  ArticleComment,
  ArticleFirestore,
  Reaction,
  ReactionType,
} from '@shared-types/articles.types';
import {
  articlesFirestoreConverter,
  commentsFirestoreConverter,
  userReactionByIdFirestoreConverter,
} from '@utils/firebase-converter';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  type QueryConstraint,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

import { reactionsApi } from './reactions-api';

const ARTICLES_PATH = ARTICLES_COLLECTIONS.PATH;
const REACTIONS_PATH = ARTICLES_COLLECTIONS.SUBCOLLECTIONS.REACTIONS;
const COMMENTS_PATH = ARTICLES_COLLECTIONS.SUBCOLLECTIONS.COMMENTS;
const VIEWS_PATH = ARTICLES_COLLECTIONS.SUBCOLLECTIONS.VIEWS;

export const ARTICLES_PAGE_SIZE = 5;
export const COMMENTS_PAGE_SIZE = 10;

export type GetCommentsResult = {
  comments: ArticleComment[];
  lastDoc: QueryDocumentSnapshot<ArticleComment> | null;
  hasMore: boolean;
};

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

  getById: async (articleId: string): Promise<Article | null> => {
    const articleRef = doc(db, ARTICLES_PATH, articleId).withConverter(articlesFirestoreConverter);
    const snapshot = await getDoc(articleRef);
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return mapArticleFromFirestore({ ...data, id: snapshot.id });
  },

  getUserReactionById: async (articleId: string, userId: string): Promise<Reaction | null> => {
    const reactionRef = doc(db, ARTICLES_PATH, articleId, REACTIONS_PATH, userId).withConverter(
      userReactionByIdFirestoreConverter
    );
    return reactionsApi.getUserReaction<Reaction>({ reactionRef });
  },

  setUserReaction: async (articleId: string, userId: string, type: ReactionType): Promise<void> => {
    await reactionsApi.setUserReaction({
      reactionRef: doc(db, ARTICLES_PATH, articleId, REACTIONS_PATH, userId),
      parentRef: doc(db, ARTICLES_PATH, articleId),
      type,
    });
  },

  getUserReactionByCommentId: async (
    articleId: string,
    commentId: string,
    userId: string
  ): Promise<Reaction | null> => {
    const reactionRef = doc(
      db,
      ARTICLES_PATH,
      articleId,
      COMMENTS_PATH,
      commentId,
      REACTIONS_PATH,
      userId
    ).withConverter(userReactionByIdFirestoreConverter);
    return reactionsApi.getUserReaction<Reaction>({ reactionRef });
  },

  setUserCommentReaction: async (
    articleId: string,
    userId: string,
    commentId: string,
    type: ReactionType
  ): Promise<void> => {
    await reactionsApi.setUserReaction({
      reactionRef: doc(
        db,
        ARTICLES_PATH,
        articleId,
        COMMENTS_PATH,
        commentId,
        REACTIONS_PATH,
        userId
      ),
      parentRef: doc(db, ARTICLES_PATH, articleId, COMMENTS_PATH, commentId),
      type,
    });
  },

  getComments: async (
    articleId: string,
    pageSize: number = COMMENTS_PAGE_SIZE,
    startAfterDoc?: QueryDocumentSnapshot<ArticleComment> | null
  ): Promise<GetCommentsResult> => {
    const commentsRef = collection(db, ARTICLES_PATH, articleId, COMMENTS_PATH).withConverter(
      commentsFirestoreConverter
    );
    const queryConstraints: QueryConstraint[] = [
      where(ARTICLES_COLLECTIONS.FIELD_PATH.PARENT_COMMENT_ID, '==', null),
      orderBy(ARTICLES_COLLECTIONS.FIELD_PATH.TIMESTAMP, SORT_DIRECTIONS.DESC),
      limit(pageSize),
    ];
    if (startAfterDoc) {
      queryConstraints.push(startAfter(startAfterDoc));
    }
    const q = query(commentsRef, ...queryConstraints);
    const snapshot = await getDocs(q);

    const roots = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
    const lastDoc =
      snapshot.docs.length > 0
        ? (snapshot.docs[snapshot.docs.length - 1] as QueryDocumentSnapshot<ArticleComment>)
        : null;
    const hasMore = snapshot.docs.length === pageSize;

    if (roots.length === 0) {
      return { comments: [], lastDoc, hasMore };
    }

    const allComments: ArticleComment[] = [...roots];
    let parentIds = roots.map((r) => r.id);
    const IN_QUERY_LIMIT = 10;

    while (parentIds.length > 0) {
      const descendants: ArticleComment[] = [];
      for (let i = 0; i < parentIds.length; i += IN_QUERY_LIMIT) {
        const chunk = parentIds.slice(i, i + IN_QUERY_LIMIT);
        const repliesQuery = query(
          commentsRef,
          where(ARTICLES_COLLECTIONS.FIELD_PATH.PARENT_COMMENT_ID, 'in', chunk)
        );
        const repliesSnapshot = await getDocs(repliesQuery);
        const page = repliesSnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
        descendants.push(...page);
      }
      if (descendants.length === 0) break;
      allComments.push(...descendants);
      parentIds = descendants.map((d) => d.id);
    }

    return { comments: allComments, lastDoc, hasMore };
  },

  getCommentById: async (articleId: string, commentId: string): Promise<ArticleComment | null> => {
    const commentRef = doc(db, ARTICLES_PATH, articleId, COMMENTS_PATH, commentId).withConverter(
      commentsFirestoreConverter
    );
    const snapshot = await getDoc(commentRef);
    if (!snapshot.exists()) return null;
    return { ...snapshot.data(), id: snapshot.id };
  },

  addComment: async (
    articleId: string,
    data: { userId: string; text: string; parentCommentId?: string | null; name: string }
  ): Promise<string> => {
    const commentsRef = collection(db, ARTICLES_PATH, articleId, COMMENTS_PATH);
    const newCommentRef = doc(commentsRef);
    const articleRef = doc(db, ARTICLES_PATH, articleId);

    await setDoc(newCommentRef, {
      userId: data.userId,
      name: data.name,
      text: data.text,
      parentCommentId: data.parentCommentId ?? null,
      timestamp: serverTimestamp(),
      likesCount: 0,
      dislikesCount: 0,
    });

    await updateDoc(articleRef, { commentsCount: increment(1) });

    return newCommentRef.id;
  },

  removeComment: async (articleId: string, commentId: string): Promise<string> => {
    const commentRef = doc(db, ARTICLES_PATH, articleId, COMMENTS_PATH, commentId);
    const reactionsRef = collection(
      db,
      ARTICLES_PATH,
      articleId,
      COMMENTS_PATH,
      commentId,
      REACTIONS_PATH
    );

    const reactionsSnap = await getDocs(reactionsRef);
    const batch = writeBatch(db);

    reactionsSnap.docs.forEach((d) => batch.delete(d.ref));
    batch.update(commentRef, {
      deleted: true,
      userId: null,
      name: null,
      text: null,
      likesCount: 0,
      dislikesCount: 0,
    });

    await batch.commit();
    return commentId;
  },

  async getLastViewDate(userId: string, articleId: string): Promise<number | null> {
    const viewRef = doc(db, ARTICLES_PATH, articleId, VIEWS_PATH, userId);
    const snap = await getDoc(viewRef);
    if (!snap.exists()) return null;

    const date = snap.data()?.lastViewDate;
    if (
      date &&
      typeof date === 'object' &&
      'toMillis' in date &&
      typeof date.toMillis === 'function'
    ) {
      return date.toMillis();
    }
    return null;
  },

  async recordView(userId: string, articleId: string): Promise<void> {
    const viewRef = doc(db, ARTICLES_PATH, articleId, VIEWS_PATH, userId);
    const articleRef = doc(db, ARTICLES_PATH, articleId);
    await setDoc(viewRef, { lastViewDate: serverTimestamp() });
    await updateDoc(articleRef, { viewsCount: increment(1) });
  },
};
