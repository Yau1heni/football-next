import { tacticsApi } from '@api/tactics-api';
import type { SaveTacticsPayload } from '@shared-types/tactics.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify/unstyled';

import { getTacticsListQueryKeys } from './keys';

type SaveTacticsVariables = { userId: string } & SaveTacticsPayload;

export const useSaveTacticsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, ...payload }: SaveTacticsVariables) =>
      tacticsApi.save(userId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: getTacticsListQueryKeys(variables.userId) });
      toast.success(`Схема «${variables.name}» сохранена`);
    },
    onError: () => {
      toast.error('Не удалось сохранить схему');
    },
  });
};
