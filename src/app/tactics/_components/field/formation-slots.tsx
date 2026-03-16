import type { FormationShape } from '@shared-types/tactics.types';
import cn from 'classnames';
import type { FC } from 'react';

import styles from './formation-slots.module.scss';

type FormationSlotsProps = {
  slots: FormationShape;
  occupiedIndices: Set<number>;
  /** Индекс слота, который подсвечивается как цель дропа (при перетаскивании). */
  highlightedSlotIndex?: number;
};

export const FormationSlots: FC<FormationSlotsProps> = (props) => {
  const { slots, occupiedIndices, highlightedSlotIndex } = props;
  return (
    <div className={styles.slots} aria-hidden>
      {slots.map((slot, index) => {
        const isOccupied = occupiedIndices.has(index);
        const isHighlighted = highlightedSlotIndex === index;
        if (isOccupied && !isHighlighted) return null;
        return (
          <div
            key={index}
            className={cn(styles.slot, isHighlighted && styles.slotHighlighted)}
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
          />
        );
      })}
    </div>
  );
};
