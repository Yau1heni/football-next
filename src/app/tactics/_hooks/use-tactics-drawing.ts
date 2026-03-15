'use client';

import { useCallback, useState } from 'react';

import type {
  DrawingPoint,
  DrawingStroke,
  DrawingStrokeColor,
} from '../_components/tactics-field/field-drawing-overlay';

const DEFAULT_STROKE_COLOR: DrawingStrokeColor = 'white';

/**
 * Состояние рисования на тактической доске: штрихи, цвет, undo/redo.
 */
export const useTacticsDrawing = () => {
  const [strokeColor, setStrokeColor] = useState<DrawingStrokeColor>(DEFAULT_STROKE_COLOR);
  const [drawingStrokes, setDrawingStrokes] = useState<DrawingStroke[]>([]);
  const [undoneStrokes, setUndoneStrokes] = useState<DrawingStroke[]>([]);

  const onDrawingStrokeEnd = useCallback(
    (points: DrawingPoint[]) => {
      if (points.length === 0) return;
      setDrawingStrokes((prev) => [...prev, { points, color: strokeColor }]);
      setUndoneStrokes([]);
    },
    [strokeColor]
  );

  const onClearDrawingAction = useCallback(() => {
    setDrawingStrokes([]);
    setUndoneStrokes([]);
  }, []);

  const onUndoStrokeAction = useCallback(() => {
    setDrawingStrokes((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setUndoneStrokes((u) => [...u, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const onRedoStrokeAction = useCallback(() => {
    setUndoneStrokes((prev) => {
      if (prev.length === 0) return prev;
      const next = prev[prev.length - 1];
      setDrawingStrokes((s) => [...s, next]);
      return prev.slice(0, -1);
    });
  }, []);

  return {
    strokeColor,
    setStrokeColor,
    drawingStrokes,
    onDrawingStrokeEnd,
    onClearDrawingAction,
    onUndoStrokeAction,
    onRedoStrokeAction,
    hasStrokes: drawingStrokes.length > 0,
    canUndo: drawingStrokes.length > 0,
    canRedo: undoneStrokes.length > 0,
  };
};
