import { LOCALE_RU, RU_COMMENT_LABELS } from '@constants/plural-forms';
import type { ArticleComment } from '@shared-types/articles.types';
import { plural } from '@utils/plural';

/** Подпись количества комментариев в нужной форме (1 комментарий, 2 комментария, 5 комментариев). */
export const getCommentsCountLabel = (count: number, locale = LOCALE_RU): string =>
  plural(count, RU_COMMENT_LABELS, locale);

/** Элемент плоского списка для отрисовки: комментарий и его глубина вложенности (0 = корневой). */
export type CommentDisplayItem = {
  comment: ArticleComment;
  depth: number;
};

const DEFAULT_MAX_DEPTH = 5;

/**
 * Строит из плоского списка комментариев (с parentCommentId) плоский же список
 * для отрисовки с учётом вложенности: каждый элемент содержит комментарий и
 * глубину отступа (0..maxDepth).
 *
 * @param comments — плоский список комментариев из API (например, Firestore).
 * @param maxDepth — максимальная глубина отступа (по умолчанию 5).
 * @returns Плоский массив { comment, depth } в порядке отрисовки.
 */
export const buildCommentsDisplayList = (
  comments: ArticleComment[],
  maxDepth: number = DEFAULT_MAX_DEPTH
): CommentDisplayItem[] => {
  if (comments.length === 0) return [];

  const byParent = new Map<string | null, ArticleComment[]>();

  comments.forEach((c) => {
    const parentId = c.parentCommentId ?? null;
    const list = byParent.get(parentId) ?? [];
    list.push(c);
    byParent.set(parentId, list);
  });

  const sortByTimestampDesc = (a: ArticleComment, b: ArticleComment) =>
    b.timestamp.toMillis() - a.timestamp.toMillis();

  byParent.forEach((list) => list.sort(sortByTimestampDesc));

  const result: CommentDisplayItem[] = [];

  const traverse = (parentId: string | null, depth: number) => {
    const children = byParent.get(parentId) ?? [];
    children.forEach((comment) => {
      const displayDepth = Math.min(depth, maxDepth);
      result.push({ comment, depth: displayDepth });
      traverse(comment.id, depth + 1);
    });
  };

  traverse(null, 0);
  return result;
};
