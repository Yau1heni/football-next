import cn from 'classnames';
import type { FC, MouseEvent } from 'react';

import type { DropdownOption } from '../use-dropdown';
import styles from './dropdown-option-item.module.scss';

type DropdownOptionItemProps = {
  option: DropdownOption;
  isSelected: boolean;
  isHighlighted: boolean;
  optionId: string;
  onSelect: (option: DropdownOption) => void;
};

export const DropdownOptionItem: FC<DropdownOptionItemProps> = (props) => {
  const { option, isSelected, isHighlighted, optionId, onSelect } = props;

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    onSelect(option);
  };

  return (
    <div
      id={optionId}
      role={'option'}
      aria-selected={isSelected}
      className={cn(styles.option, {
        [styles.optionSelected]: isSelected,
        [styles.optionHighlighted]: isHighlighted,
      })}
      onMouseDown={handleMouseDown}
    >
      {option.value}
    </div>
  );
};
