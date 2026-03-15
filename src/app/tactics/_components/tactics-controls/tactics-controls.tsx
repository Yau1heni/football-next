import { Dropdown, type DropdownOption } from '@components/dropdown';
import { Button } from '@components/ui/button';
import { Typography } from '@components/ui/typography';
import { FORMATION_OPTIONS, FORMATIONS } from '@constants/tactics';
import type { FC } from 'react';

import styles from './tactics-controls.module.scss';

export type TacticsViewMode = 'drag' | 'draw';

type TacticsControlsProps = {
  formationId: string;
  onFormationChangeAction: (id: string) => void;
  viewMode: TacticsViewMode;
  onViewModeChangeAction: (mode: TacticsViewMode) => void;
  hasStrokes: boolean;
  onClearDrawingAction: () => void;
  onResetLineupAction: () => void;
};

export const TacticsControls: FC<TacticsControlsProps> = (props) => {
  const {
    formationId,
    onFormationChangeAction,
    viewMode,
    onViewModeChangeAction,
    hasStrokes,
    onClearDrawingAction,
    onResetLineupAction,
  } = props;

  const formationValue =
    formationId && formationId in FORMATIONS ? { key: formationId, value: formationId } : null;

  const handleFormationChangeAction = (opt: DropdownOption | null) => {
    onFormationChangeAction(opt?.key ?? '');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
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
      <div className={styles.modeRow}>
        <div className={styles.modeToggle} role="group" aria-label="Режим">
          <Button
            variant={viewMode === 'drag' ? 'primary' : 'ghost'}
            onClick={() => onViewModeChangeAction('drag')}
            aria-pressed={viewMode === 'drag'}
          >
            Расставлять
          </Button>
          <Button
            variant={viewMode === 'draw' ? 'primary' : 'ghost'}
            onClick={() => onViewModeChangeAction('draw')}
            aria-pressed={viewMode === 'draw'}
          >
            Рисовать
          </Button>
        </div>
        {viewMode === 'draw' && hasStrokes && (
          <Button variant="ghost" onClick={onClearDrawingAction}>
            Стереть
          </Button>
        )}
        <Button variant="ghost" onClick={onResetLineupAction}>
          Сбросить расстановку
        </Button>
      </div>
    </div>
  );
};
