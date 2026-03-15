'use client';

import type { FC, ReactNode } from 'react';

import styles from '../tactics-controls.module.scss';

type TacticsControlsBarProps = {
  children: ReactNode;
};

export const TacticsControlsBar: FC<TacticsControlsBarProps> = ({ children }) => (
  <div className={styles.wrap}>{children}</div>
);
