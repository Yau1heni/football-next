'use client';

import { Button } from '@components/ui/button';
import { MoonIcon, SunIcon } from '@components/ui/icons';
import { THEME } from '@constants/theme';
import { useThemeContext } from '@contexts/theme';
import type { FC } from 'react';

import styles from './theme-toggle.module.scss';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === THEME.DARK;

  return (
    <Button
      variant="ghost"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      {isDark ? <SunIcon className={styles.icon} /> : <MoonIcon className={styles.icon} />}
    </Button>
  );
};
