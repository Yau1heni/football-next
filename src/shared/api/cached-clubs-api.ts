import { unstable_cache } from 'next/cache';

import { clubsApi } from './clubs-api';

/**
 * Серверный кэш для клубов (Next.js Data Cache).
 * Используется только в Server Components / page.tsx.
 * Клубы меняются редко — TTL 1 час.
 */
export const cachedClubsApi = {
  getClub: unstable_cache((id: string) => clubsApi.getClub(id), ['club-by-id'], {
    revalidate: 3600,
    tags: ['clubs'],
  }),
};
