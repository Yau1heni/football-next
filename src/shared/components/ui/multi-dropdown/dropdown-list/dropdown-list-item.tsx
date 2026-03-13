import cn from 'classnames';
import type { FC, MouseEvent } from 'react';

import type { Option } from '../multi-dropdown';
import styles from './dropdown-list.module.scss';

type DropdownListItemProps = {
  option: Option;
  onSelect: (option: Option) => void;
  isSelected: boolean;
  isHighlighted: boolean;
  optionId: string;
};

export const DropdownListItem: FC<DropdownListItemProps> = (props) => {
  const { option, onSelect, isSelected, isHighlighted, optionId } = props;

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
        [styles.selected]: isSelected,
        [styles.highlighted]: isHighlighted,
      })}
      onMouseDown={handleMouseDown}
    >
      {option.value}
    </div>
  );
};
