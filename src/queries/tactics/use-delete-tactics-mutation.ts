import { tacticsApi } from '@api/tactics-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify/unstyled';

import { getTacticsListQueryKeys } from './keys';

type DeleteTacticsVariables = { userId: string; tacticId: string };

export const useDeleteTacticsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, tacticId }: DeleteTacticsVariables) =>
      tacticsApi.remove(userId, tacticId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: getTacticsListQueryKeys(variables.userId) });
      toast.success('Схема удалена');
    },
    onError: () => {
      toast.error('Не удалось удалить схему');
    },
  });
};
