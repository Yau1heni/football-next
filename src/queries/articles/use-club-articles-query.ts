import { articlesApi } from '@api/articles-api';
import { useQuery } from '@tanstack/react-query';

import { getClubArticlesQueryKeys } from './keys';

export const useClubArticlesQuery = (tag: string) =>
  useQuery({
    queryKey: getClubArticlesQueryKeys(tag),
    queryFn: () => articlesApi.getByTags(tag),
  });
