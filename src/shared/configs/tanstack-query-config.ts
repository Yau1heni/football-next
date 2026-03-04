import { STALE_TIME_MS } from '@constants/queries';

export const clientOptions = {
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME_MS,
      gcTime: 10 * 60 * 1000,
    },
  },
};
