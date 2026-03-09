import { Typography } from '@components/ui/typography';
import type { FC } from 'react';

import type { Option } from '../multi-dropdown';
import styles from './dropdown-list.module.scss';
import { DropdownListItem } from './dropdown-list-item';

type DropdownListProps = {
  open: boolean;
  disabled?: boolean;
  filteredOptions: Option[];
  onSelect: (option: Option) => void;
  selectedKeys: Set<string>;
  listboxId: string;
  highlightedIndex: number;
  getOptionId: (key: string) => string;
};

export const DropdownList: FC<DropdownListProps> = (props) => {
  const {
    open,
    disabled,
    filteredOptions,
    onSelect,
    selectedKeys,
    listboxId,
    highlightedIndex,
    getOptionId,
  } = props;

  if (!open || disabled) return null;

  return (
    <div id={listboxId} role={'listbox'} className={styles.dropdown}>
      {filteredOptions.length === 0 ? (
        <Typography view={'p-16'} className={styles.emptyOption}>
          Нет вариантов
        </Typography>
      ) : (
        filteredOptions.map((opt, index) => (
          <DropdownListItem
            key={opt.key}
            option={opt}
            onSelect={onSelect}
            isSelected={selectedKeys.has(opt.key)}
            isHighlighted={index === highlightedIndex}
            optionId={getOptionId(opt.key)}
          />
        ))
      )}
    </div>
  );
};
