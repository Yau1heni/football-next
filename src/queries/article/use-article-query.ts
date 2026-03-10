import { articlesApi } from '@api/articles-api';
import { useQuery } from '@tanstack/react-query';

import {
  getArticleLastViewDateQueryKeys,
  getArticleQueryKeys,
  getArticleUserReactionQueryKeys,
} from './keys';

export const useArticleQuery = (articleId: string) =>
  useQuery({
    queryKey: getArticleQueryKeys(articleId),
    enabled: !!articleId,
    queryFn: () => articlesApi.getById(articleId),
    throwOnError: true,
  });

export const useArticleUserReactionQuery = (articleId: string, userId: string) =>
  useQuery({
    queryKey: getArticleUserReactionQueryKeys(articleId, userId),
    enabled: !!articleId && !!userId,
    queryFn: () => articlesApi.getUserReactionById(articleId, userId),
  });

export const useArticleLastViewDateQuery = (articleId: string, userId: string) =>
  useQuery({
    queryKey: getArticleLastViewDateQueryKeys(articleId, userId),
    enabled: !!articleId && !!userId,
    queryFn: () => articlesApi.getLastViewDate(userId, articleId),
  });
