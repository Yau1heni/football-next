'use client';

import type { TacticsViewMode } from '@shared-types/tactics.types';
import { useCallback, useState } from 'react';

/**
 * Режим отображения тактической доски: расставлять игроков или рисовать.
 */
export const useTacticsViewMode = () => {
  const [viewMode, setViewMode] = useState<TacticsViewMode>('drag');

  const onViewModeChangeAction = useCallback((mode: TacticsViewMode) => {
    setViewMode(mode);
  }, []);

  return {
    viewMode,
    onViewModeChangeAction,
    isDrawMode: viewMode === 'draw',
    isDragMode: viewMode === 'drag',
  };
};
