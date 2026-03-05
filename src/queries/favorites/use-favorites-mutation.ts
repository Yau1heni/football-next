import { favoritesApi } from '@api/favorites-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getFavoritesQueryKeys } from './keys';

type ToggleFavoriteParams = {
  userId: string;
  clubId: string;
  isCurrentlyFavorite: boolean;
};

export const useFavoritesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, clubId, isCurrentlyFavorite }: ToggleFavoriteParams) => {
      if (isCurrentlyFavorite) {
        await favoritesApi.removeFavorite(userId, clubId);
      } else {
        await favoritesApi.addFavorite(userId, clubId);
      }
      await queryClient.refetchQueries({ queryKey: getFavoritesQueryKeys(userId) });
    },
  });
};
