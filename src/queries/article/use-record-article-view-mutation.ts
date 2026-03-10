import { articlesApi } from '@api/articles-api';
import { getArticlesQueryKeys } from '@queries/articles';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getArticleLastViewDateQueryKeys, getArticleQueryKeys } from './keys';

export type RecordArticleViewVariables = {
  articleId: string;
  userId: string;
};

export const useRecordArticleViewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, userId }: RecordArticleViewVariables) =>
      articlesApi.recordView(userId, articleId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: getArticleLastViewDateQueryKeys(variables.articleId, variables.userId),
      });
      queryClient.invalidateQueries({ queryKey: getArticleQueryKeys(variables.articleId) });
      queryClient.invalidateQueries({ queryKey: getArticlesQueryKeys() });
    },
  });
};
