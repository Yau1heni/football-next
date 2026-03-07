import { unstable_cache } from 'next/cache';

import { articlesApi } from './articles-api';

/**
 * Серверный кэш для статей (Next.js Data Cache).
 * Используется только в Server Components / page.tsx.
 */
export const cachedArticlesApi = {
  getById: unstable_cache((id: string) => articlesApi.getById(id), ['article-by-id'], {
    revalidate: 300,
    tags: ['articles'],
  }),
};
