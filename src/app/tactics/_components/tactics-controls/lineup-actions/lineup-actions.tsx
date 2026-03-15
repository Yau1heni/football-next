'use client';

import { Button } from '@components/ui/button';
import type { FC } from 'react';

import styles from '../tactics-controls.module.scss';

type TacticsLineupActionsProps = {
  hasPlayersOnField: boolean;
  onResetLineupAction: () => void;
};

export const TacticsLineupActions: FC<TacticsLineupActionsProps> = ({
  hasPlayersOnField,
  onResetLineupAction,
}) => (
  <div className={styles.section}>
    <Button variant="ghost" onClick={onResetLineupAction} disabled={!hasPlayersOnField}>
      Сбросить расстановку
    </Button>
  </div>
);
