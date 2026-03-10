import { articlesApi, COMMENTS_PAGE_SIZE } from '@api/articles-api';
import type { ArticleComment } from '@shared-types/articles.types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

import { getArticleCommentsQueryKeys, getArticleCommentsReactionQueryKeys } from './keys';

export const useArticleCommentsQuery = (articleId: string) =>
  useInfiniteQuery({
    queryKey: getArticleCommentsQueryKeys(articleId),
    queryFn: ({ pageParam }) => articlesApi.getComments(articleId, COMMENTS_PAGE_SIZE, pageParam),
    initialPageParam: undefined as QueryDocumentSnapshot<ArticleComment> | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastDoc : undefined),
    enabled: !!articleId,
  });

export const useArticleCommentsReactionQuery = (
  articleId: string,
  commentId: string,
  userId: string
) =>
  useQuery({
    queryKey: getArticleCommentsReactionQueryKeys(articleId, commentId, userId),
    enabled: !!articleId && !!userId && !!commentId,
    queryFn: () => articlesApi.getUserReactionByCommentId(articleId, commentId, userId),
  });
