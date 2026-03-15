'use client';

import type { FC } from 'react';
import { type PointerEvent, useCallback, useRef, useState } from 'react';

import styles from './field-drawing-overlay.module.scss';

export type DrawingPoint = { x: number; y: number };

export type DrawingStroke = DrawingPoint[];

type FieldDrawingOverlayProps = {
  isDrawMode: boolean;
  strokes: DrawingStroke[];
  onStrokeEndAction: (stroke: DrawingStroke) => void;
};

const pointsToPath = (points: DrawingPoint[]): string => {
  if (points.length === 0) return '';
  const [first, ...rest] = points;
  const restPath = rest.map((p) => `L ${p.x} ${p.y}`).join(' ');
  return `M ${first.x} ${first.y} ${restPath}`;
};

export const FieldDrawingOverlay: FC<FieldDrawingOverlayProps> = (props) => {
  const { isDrawMode, strokes, onStrokeEndAction } = props;
  const [currentStroke, setCurrentStroke] = useState<DrawingPoint[]>([]);
  const overlayRef = useRef<SVGSVGElement>(null);

  const clientToPercent = useCallback((clientX: number, clientY: number): DrawingPoint | null => {
    const el = overlayRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return null;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
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

  return (
    <svg
      ref={overlayRef}
      className={styles.overlay}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ pointerEvents: isDrawMode ? 'auto' : 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      aria-hidden
    >
      <g className={styles.strokes}>
        {strokes.map((stroke, i) => (
          <path key={i} className={styles.stroke} d={pointsToPath(stroke)} />
        ))}
        {currentStroke.length > 0 && (
          <path className={styles.stroke} d={pointsToPath(currentStroke)} />
        )}
      </g>
    </svg>
  );
};
