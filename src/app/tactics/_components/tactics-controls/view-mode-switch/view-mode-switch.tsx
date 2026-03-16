'use client';

import { RadioGroup } from '@components/ui/radio-group';
import { Typography } from '@components/ui/typography';
import { VIEW_MODE_OPTIONS } from '@constants/tactics';
import type { TacticsViewMode } from '@shared-types/tactics.types';
import type { FC } from 'react';

import styles from '../tactics-controls.module.scss';

type TacticsViewModeSwitchProps = {
  viewMode: TacticsViewMode;
  onViewModeChangeAction: (mode: TacticsViewMode) => void;
};

export const TacticsViewModeSwitch: FC<TacticsViewModeSwitchProps> = ({
  viewMode,
  onViewModeChangeAction,
}) => (
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
);
