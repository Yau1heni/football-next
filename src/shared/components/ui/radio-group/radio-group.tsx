'use client';

import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './radio-group.module.scss';

export type RadioGroupOption<T extends string = string> = {
  value: T;
  label: ReactNode;
  /** Подпись для screen reader (если label визуально не текст) */
  ariaLabel?: string;
};

type RadioGroupVariant = 'default' | 'color';

type RadioGroupProps<T extends string = string> = {
  options: RadioGroupOption<T>[];
  value: T;
  onChangeAction: (value: T) => void;
  name?: string;
  'aria-label'?: string;
  variant?: RadioGroupVariant;
  disabled?: boolean;
  className?: string;
};

export const RadioGroup = <T extends string = string>(props: RadioGroupProps<T>) => {
  const {
    options,
    value,
    onChangeAction,
    name = 'radio-group',
    'aria-label': ariaLabel,
    variant = 'default',
    disabled = false,
    className,
  } = props;

  const isColor = variant === 'color';

  return (
    <div
      className={cn(
        styles.root,
        isColor && styles.rootColor,
        disabled && styles.rootDisabled,
        className
      )}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {options.map((opt) => (
        <label key={opt.value} className={styles.option} data-part="option">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChangeAction(opt.value as T)}
            className={cn(styles.radio, isColor && styles.radioHidden)}
            aria-label={opt.ariaLabel}
            disabled={disabled}
          />
          <span className={styles.label}>{opt.label}</span>
        </label>
      ))}
    </div>
  );
};
