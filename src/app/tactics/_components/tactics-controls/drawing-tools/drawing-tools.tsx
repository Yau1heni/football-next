'use client';

import { Button } from '@components/ui/button';
import { RedoIcon, UndoIcon } from '@components/ui/icons';
import type { FC } from 'react';

import styles from '../tactics-controls.module.scss';

type TacticsDrawingToolsProps = {
  isDrawMode: boolean;
  hasStrokes: boolean;
  onClearDrawingAction: () => void;
  canUndo: boolean;
  onUndoStrokeAction: () => void;
  canRedo: boolean;
  onRedoStrokeAction: () => void;
};

export const TacticsDrawingTools: FC<TacticsDrawingToolsProps> = (props) => {
  const {
    isDrawMode,
    hasStrokes,
    onClearDrawingAction,
    canUndo,
    onUndoStrokeAction,
    canRedo,
    onRedoStrokeAction,
  } = props;

  return (
    <div className={styles.section}>
      <Button
        variant="ghost"
        onClick={onUndoStrokeAction}
        disabled={!isDrawMode || !canUndo}
        title="Отменить последний штрих"
        aria-label="Отменить последний штрих"
      >
        <UndoIcon width={20} height={20} />
      </Button>
      <Button
        variant="ghost"
        onClick={onRedoStrokeAction}
        disabled={!isDrawMode || !canRedo}
        title="Вернуть отменённый штрих"
        aria-label="Вернуть отменённый штрих"
      >
        <RedoIcon width={20} height={20} />
      </Button>
      <Button variant="ghost" onClick={onClearDrawingAction} disabled={!isDrawMode || !hasStrokes}>
        Стереть
      </Button>
    </div>
  );
};
