import { articlesApi } from '@api/articles-api';
import { STALE_TIME_MS } from '@constants/queries';
import { useQuery } from '@tanstack/react-query';

import { getArticleQueryKeys, getArticleUserReactionQueryKeys } from './keys';

export const useArticleQuery = (articleId: string) =>
  useQuery({
    queryKey: getArticleQueryKeys(articleId),
    enabled: !!articleId,
    queryFn: () => articlesApi.getById(articleId),
    staleTime: STALE_TIME_MS,
  });

export const useArticleUserReactionQuery = (articleId: string, userId: string) =>
  useQuery({
    queryKey: getArticleUserReactionQueryKeys(articleId, userId),
    enabled: !!articleId && !!userId,
    queryFn: () => articlesApi.getUserReactionById(articleId, userId),
    staleTime: STALE_TIME_MS,
  });
