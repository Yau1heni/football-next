'use client';

import { useCallback, useState } from 'react';

import type { DrawingStroke } from '../_components/tactics-field/field-drawing-overlay';

/**
 * Состояние рисования на тактической доске: штрихи и действия.
 */
export const useTacticsDrawing = () => {
  const [drawingStrokes, setDrawingStrokes] = useState<DrawingStroke[]>([]);

  const onDrawingStrokeEnd = useCallback((stroke: DrawingStroke) => {
    setDrawingStrokes((prev) => [...prev, stroke]);
  }, []);

  const onClearDrawingAction = useCallback(() => {
    setDrawingStrokes([]);
  }, []);

  return {
    drawingStrokes,
    onDrawingStrokeEnd,
    onClearDrawingAction,
    hasStrokes: drawingStrokes.length > 0,
  };
};
