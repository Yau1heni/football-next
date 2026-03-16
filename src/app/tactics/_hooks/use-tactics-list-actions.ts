'use client';

import { tacticsApi } from '@api/tactics-api';
import { useAuthContext } from '@contexts/auth';
import { useDeleteTacticsMutation } from '@queries/tactics';
import type { DrawingStroke, PlayerOnBoard } from '@shared-types/tactics.types';
import { useCallback, useState } from 'react';

type UseTacticsListActionsParams = {
  applySavedTacticsAction: (formationId: string, players: PlayerOnBoard[]) => void;
  loadDrawingStrokesAction: (strokes: DrawingStroke[]) => void;
};

/**
 * Хук действий со списком сохранённых тактик: удаление и применение на доску.
 */
export const useTacticsListActions = (params: UseTacticsListActionsParams) => {
  const { user } = useAuthContext();
  const [applyingTacticId, setApplyingTacticId] = useState<string | null>(null);
  const [deletingTacticId, setDeletingTacticId] = useState<string | null>(null);
  const deleteTactics = useDeleteTacticsMutation();
  const { applySavedTacticsAction, loadDrawingStrokesAction } = params;

  const onDeleteTacticsAction = useCallback(
    (tacticId: string) => {
      const uid = user?.uid;
      if (!uid) return;
      setDeletingTacticId(tacticId);
      deleteTactics.mutate(
        { userId: uid, tacticId },
        { onSettled: () => setDeletingTacticId(null) }
      );
    },
    [user?.uid, deleteTactics]
  );

  const onApplyTacticsAction = useCallback(
    async (tacticId: string) => {
      const uid = user?.uid;
      if (!uid) return;
      setApplyingTacticId(tacticId);
      try {
        const tactic = await tacticsApi.getById(uid, tacticId);
        if (tactic) {
          applySavedTacticsAction(tactic.formationId, tactic.players);
          loadDrawingStrokesAction(tactic.drawingStrokes);
        }
      } finally {
        setApplyingTacticId(null);
      }
    },
    [user?.uid, applySavedTacticsAction, loadDrawingStrokesAction]
  );

  return {
    onDeleteTacticsAction,
    deletingTacticId,
    onApplyTacticsAction,
    applyingTacticId,
  };
};
