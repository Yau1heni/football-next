'use client';

import { STROKE_COLOR_HEX } from '@constants/tactics';
import type { DrawingPoint, DrawingStroke, DrawingStrokeColor } from '@shared-types/tactics.types';
import type { FC } from 'react';

import styles from './field-drawing-overlay.module.scss';
import { pointsToPath } from './field-drawing-overlay.utils';
import { useFieldDrawingOverlay } from './use-field-drawing-overlay';

export type { DrawingPoint, DrawingStroke } from '@shared-types/tactics.types';

type FieldDrawingOverlayProps = {
  isDrawMode: boolean;
  strokes: DrawingStroke[];
  currentStrokeColor: DrawingStrokeColor;
  onStrokeEndAction: (points: DrawingPoint[]) => void;
};

export const FieldDrawingOverlay: FC<FieldDrawingOverlayProps> = (props) => {
  const { isDrawMode, strokes, currentStrokeColor, onStrokeEndAction } = props;

  const {
    overlayRef,
    currentStroke,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerLeave,
  } = useFieldDrawingOverlay({ isDrawMode, onStrokeEndAction });

  const currentStrokeColorHex = STROKE_COLOR_HEX[currentStrokeColor];

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
          <path
            key={i}
            className={styles.stroke}
            d={pointsToPath(stroke.points)}
            style={{ stroke: STROKE_COLOR_HEX[stroke.color] }}
          />
        ))}
        {currentStroke.length > 0 && (
          <path
            className={styles.stroke}
            d={pointsToPath(currentStroke)}
            style={{ stroke: currentStrokeColorHex }}
          />
        )}
      </g>
    </svg>
  );
};
