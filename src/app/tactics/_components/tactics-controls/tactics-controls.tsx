import { Dropdown, type DropdownOption } from '@components/dropdown';
import { Button } from '@components/ui/button';
import { RedoIcon, UndoIcon } from '@components/ui/icons';
import { RadioGroup, type RadioGroupOption } from '@components/ui/radio-group';
import { Typography } from '@components/ui/typography';
import {
  FORMATION_OPTIONS,
  FORMATIONS,
  STROKE_COLOR_HEX,
  STROKE_COLOR_OPTIONS,
  VIEW_MODE_OPTIONS,
} from '@constants/tactics';
import type { DrawingStrokeColor, TacticsViewMode } from '@shared-types/tactics.types';
import type { FC } from 'react';

import styles from './tactics-controls.module.scss';

type TacticsControlsProps = {
  formationId: string;
  onFormationChangeAction: (id: string) => void;
  viewMode: TacticsViewMode;
  onViewModeChangeAction: (mode: TacticsViewMode) => void;
  strokeColor: DrawingStrokeColor;
  onStrokeColorChangeAction: (color: DrawingStrokeColor) => void;
  hasStrokes: boolean;
  onClearDrawingAction: () => void;
  canUndo: boolean;
  onUndoStrokeAction: () => void;
  canRedo: boolean;
  onRedoStrokeAction: () => void;
  hasPlayersOnField: boolean;
  onResetLineupAction: () => void;
};

export const TacticsControls: FC<TacticsControlsProps> = (props) => {
  const {
    formationId,
    onFormationChangeAction,
    viewMode,
    onViewModeChangeAction,
    strokeColor,
    onStrokeColorChangeAction,
    hasStrokes,
    onClearDrawingAction,
    canUndo,
    onUndoStrokeAction,
    canRedo,
    onRedoStrokeAction,
    hasPlayersOnField,
    onResetLineupAction,
  } = props;

  const formationValue =
    formationId && formationId in FORMATIONS ? { key: formationId, value: formationId } : null;

  const handleFormationChangeAction = (opt: DropdownOption | null) => {
    onFormationChangeAction(opt?.key ?? '');
  };

  const strokeColorOptions: RadioGroupOption<DrawingStrokeColor>[] = STROKE_COLOR_OPTIONS.map(
    (o) => ({
      value: o.value,
      ariaLabel: o.ariaLabel,
      label: (
        <span className={styles.colorSwatch} style={{ background: STROKE_COLOR_HEX[o.value] }} />
      ),
    })
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.section}>
        <Typography tag="span" view="p-14" className={styles.label}>
          Формация
        </Typography>
        <Dropdown
          className={styles.formationDropdown}
          options={FORMATION_OPTIONS}
          value={formationValue}
          onChangeAction={handleFormationChangeAction}
          placeholder="Выберите формацию"
        />
      </div>

      <div className={styles.section}>
        <Typography tag="span" view="p-14" className={styles.label}>
          Режим
        </Typography>
        <RadioGroup<TacticsViewMode>
          options={VIEW_MODE_OPTIONS}
          value={viewMode}
          onChangeAction={onViewModeChangeAction}
          name="tactics-view-mode"
          aria-label="Режим: расставлять или рисовать"
          className={styles.modeGroup}
        />
      </div>

      <div className={styles.section}>
        <Typography tag="span" view="p-14" className={styles.label}>
          Цвет
        </Typography>
        <RadioGroup<DrawingStrokeColor>
          options={strokeColorOptions}
          value={strokeColor}
          onChangeAction={onStrokeColorChangeAction}
          name="tactics-stroke-color"
          aria-label="Цвет маркера"
          variant="color"
          disabled={viewMode !== 'draw'}
          className={styles.colorGroup}
        />
      </div>

      <div className={styles.section}>
        <Button
          variant="ghost"
          onClick={onUndoStrokeAction}
          disabled={viewMode !== 'draw' || !canUndo}
          title="Отменить последний штрих"
          aria-label="Отменить последний штрих"
        >
          <UndoIcon width={20} height={20} />
        </Button>
        <Button
          variant="ghost"
          onClick={onRedoStrokeAction}
          disabled={viewMode !== 'draw' || !canRedo}
          title="Вернуть отменённый штрих"
          aria-label="Вернуть отменённый штрих"
        >
          <RedoIcon width={20} height={20} />
        </Button>
        <Button
          variant="ghost"
          onClick={onClearDrawingAction}
          disabled={viewMode !== 'draw' || !hasStrokes}
        >
          Стереть
        </Button>
      </div>

      <div className={styles.section}>
        <Button variant="ghost" onClick={onResetLineupAction} disabled={!hasPlayersOnField}>
          Сбросить расстановку
        </Button>
      </div>
    </div>
  );
};
