'use client';

import { useCallback, useState } from 'react';

import type { TacticsViewMode } from '../_components/tactics-controls';

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
