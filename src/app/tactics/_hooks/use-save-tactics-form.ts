'use client';

import { MAX_SAVED_TACTICS, MIN_PLAYERS_ON_FIELD_TO_SAVE } from '@constants/tactics';
import { useAuthContext } from '@contexts/auth';
import { useSaveTacticsMutation, useTacticsListQuery } from '@queries/tactics';
import type { DrawingStroke, PlayerOnBoard } from '@shared-types/tactics.types';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify/unstyled';

type UseSaveTacticsFormParams = {
  players: PlayerOnBoard[];
  formationId: string;
  drawingStrokes: DrawingStroke[];
};

/**
 * Хук формы сохранения схемы тактики: состояние формы, canSave, сабмит в Firestore.
 * Использует useAuthContext и useSaveTacticsMutation внутри.
 */
export const useSaveTacticsForm = (params: UseSaveTacticsFormParams) => {
  const { players, formationId, drawingStrokes } = params;
  const { user } = useAuthContext();
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [saveName, setSaveName] = useState('');
  const saveTactics = useSaveTacticsMutation();
  const { data: savedItems = [] } = useTacticsListQuery(user?.uid ?? '');

  const canSaveTactics = useMemo(
    () => players.filter((p) => p.position != null).length >= MIN_PLAYERS_ON_FIELD_TO_SAVE,
    [players]
  );

  const onSaveClickAction = useCallback(() => {
    if (savedItems.length >= MAX_SAVED_TACTICS) {
      toast.info(
        `Достигнут лимит схем (${MAX_SAVED_TACTICS}). Удалите одну из сохранённых схем, чтобы сохранить новую.`
      );
      return;
    }
    setShowSaveForm(true);
    setSaveName('');
  }, [savedItems.length]);

  const onSaveCancelAction = useCallback(() => {
    setShowSaveForm(false);
    setSaveName('');
  }, []);

  const onSaveSubmitAction = useCallback(() => {
    const name = saveName.trim();
    if (!name || !user?.uid) return;
    saveTactics.mutate(
      {
        userId: user.uid,
        name,
        formationId,
        players,
        drawingStrokes,
      },
      {
        onSuccess: () => {
          setShowSaveForm(false);
          setSaveName('');
        },
      }
    );
  }, [saveName, user, formationId, players, drawingStrokes, saveTactics]);

  return {
    canSaveTactics,
    showSaveForm,
    saveName,
    setSaveName,
    onSaveClickAction,
    onSaveCancelAction,
    onSaveSubmitAction,
    isSavePending: saveTactics.isPending,
  };
};
