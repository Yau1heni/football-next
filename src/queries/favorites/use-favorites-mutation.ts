import { favoritesApi } from '@api/favorites-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify/unstyled';

import { getFavoritesQueryKeys } from './keys';

type ToggleFavoriteParams = {
  userId: string;
  clubId: string;
  isCurrentlyFavorite: boolean;
  clubName?: string;
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
    onSuccess: (_, variables) => {
      const name = variables.clubName ?? 'Клуб';
      toast.success(
        variables.isCurrentlyFavorite
          ? `${name} удалён из избранного`
          : `${name} добавлен в избранное`
      );
    },
    onError: () => {
      toast.error('Не удалось изменить избранное');
    },
  });
};
