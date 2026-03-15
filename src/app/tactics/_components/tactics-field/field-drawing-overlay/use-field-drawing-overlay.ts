'use client';

import { RATIO_TO_PERCENT_FACTOR } from '@constants/tactics';
import type { PointerEvent } from 'react';
import { useCallback, useRef, useState } from 'react';

import type { DrawingPoint } from './field-drawing-overlay';

type UseFieldDrawingOverlayParams = {
  isDrawMode: boolean;
  onStrokeEndAction: (points: DrawingPoint[]) => void;
};

export const useFieldDrawingOverlay = (params: UseFieldDrawingOverlayParams) => {
  const { isDrawMode, onStrokeEndAction } = params;
  const [currentStroke, setCurrentStroke] = useState<DrawingPoint[]>([]);
  const overlayRef = useRef<SVGSVGElement>(null);

  const clientToPercent = useCallback((clientX: number, clientY: number): DrawingPoint | null => {
    const el = overlayRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const x = ((clientX - rect.left) / rect.width) * RATIO_TO_PERCENT_FACTOR;
    const y = ((clientY - rect.top) / rect.height) * RATIO_TO_PERCENT_FACTOR;
    return { x, y };
  }, []);

  const handlePointerDown = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      if (!isDrawMode) return;
      e.preventDefault();
      const point = clientToPercent(e.clientX, e.clientY);
      if (point) {
        setCurrentStroke([point]);
        (e.target as SVGSVGElement).setPointerCapture?.(e.pointerId);
      }
    },
    [isDrawMode, clientToPercent]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<SVGSVGElement>) => {
      if (!isDrawMode || currentStroke.length === 0) return;
      const point = clientToPercent(e.clientX, e.clientY);
      if (point) setCurrentStroke((prev) => [...prev, point]);
    },
    [isDrawMode, currentStroke.length, clientToPercent]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!isDrawMode) return;
      (e.target as SVGSVGElement).releasePointerCapture?.(e.pointerId);
      if (currentStroke.length > 0) {
        onStrokeEndAction(currentStroke);
        setCurrentStroke([]);
      }
    },
    [isDrawMode, currentStroke, onStrokeEndAction]
  );

  const handlePointerLeave = useCallback(() => {
    if (currentStroke.length > 0) {
      onStrokeEndAction(currentStroke);
      setCurrentStroke([]);
    }
  }, [currentStroke, onStrokeEndAction]);

  return {
    overlayRef,
    currentStroke,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
  };
};
