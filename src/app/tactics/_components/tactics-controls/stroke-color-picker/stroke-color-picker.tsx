'use client';

import { RadioGroup, type RadioGroupOption } from '@components/ui/radio-group';
import { Typography } from '@components/ui/typography';
import { STROKE_COLOR_HEX, STROKE_COLOR_OPTIONS } from '@constants/tactics';
import type { DrawingStrokeColor } from '@shared-types/tactics.types';
import type { FC } from 'react';

import styles from '../tactics-controls.module.scss';

type TacticsStrokeColorPickerProps = {
  strokeColor: DrawingStrokeColor;
  onStrokeColorChangeAction: (color: DrawingStrokeColor) => void;
  isDrawMode: boolean;
};

export const TacticsStrokeColorPicker: FC<TacticsStrokeColorPickerProps> = ({
  strokeColor,
  onStrokeColorChangeAction,
  isDrawMode,
}) => {
  const options: RadioGroupOption<DrawingStrokeColor>[] = STROKE_COLOR_OPTIONS.map((o) => ({
    value: o.value,
    ariaLabel: o.ariaLabel,
    label: (
      <span className={styles.colorSwatch} style={{ background: STROKE_COLOR_HEX[o.value] }} />
    ),
  }));

  return (
    <div className={styles.section}>
      <Typography tag="span" view="p-14" className={styles.label}>
        Цвет
      </Typography>
      <RadioGroup<DrawingStrokeColor>
        options={options}
        value={strokeColor}
        onChangeAction={onStrokeColorChangeAction}
        name="tactics-stroke-color"
        aria-label="Цвет маркера"
        variant="color"
        disabled={!isDrawMode}
        className={styles.colorGroup}
      />
    </div>
  );
};
