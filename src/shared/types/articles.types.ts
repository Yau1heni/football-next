import type { Timestamp } from 'firebase/firestore';

/** Статья для использования в приложении (сериализуемый тип, timestamp в мс). */
export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  /** Время в миллисекундах (epoch), для сериализации при передаче в Client Components. */
  timestamp: number;
  likesCount: number;
  dislikesCount: number;
  viewsCount: number;
  commentsCount: number;
};

/** Документ статьи в Firestore (timestamp — объект Timestamp). */
export type ArticleFirestore = Omit<Article, 'timestamp'> & { timestamp: Timestamp };

export const REACTION = {
  LIKE: 'like',
  DISLIKE: 'dislike',
} as const;

export type ReactionType = (typeof REACTION)[keyof typeof REACTION];

export type Reaction = {
  userId: string;
  timestamp: Timestamp;
  type: ReactionType;
};

export type ArticleComment = {
  id: string;
  userId: string | null;
  name: string | null;
  text: string | null;
  parentCommentId: string | null;
  timestamp: Timestamp;
  likesCount: number;
  dislikesCount: number;
  /** При soft delete: true, контент и автор обнулены */
  deleted?: boolean;
};
