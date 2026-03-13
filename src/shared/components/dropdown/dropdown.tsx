'use client';

import { Button } from '@components/ui/button';
import { ArrowDownIcon } from '@components/ui/icons';
import { Input } from '@components/ui/input';
import { Typography } from '@components/ui/typography';
import cn from 'classnames';
import type { FC } from 'react';

import styles from './dropdown.module.scss';
import { DropdownOptionItem } from './dropdown-option-item/dropdown-option-item';
import type { DropdownOption } from './use-dropdown';
import { useDropdown } from './use-dropdown';

export type { DropdownOption };

export type DropdownProps = {
  className?: string;
  options: DropdownOption[];
  value: DropdownOption | null;
  onChangeAction: (value: DropdownOption | null) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const Dropdown: FC<DropdownProps> = (props) => {
  const {
    options,
    value,
    onChangeAction,
    className,
    disabled,
    placeholder = 'Выберите значение',
  } = props;

  const {
    open,
    setOpen,
    handleSelect,
    handleKeyDown,
    containerRef,
    selectedKey,
    highlightedIndex,
    listboxId,
    getOptionId,
    options: optionsList,
  } = useDropdown(options, value, onChangeAction);

  const handleInputFocus = () => setOpen(true);

  const handleIconButtonClick = () => {
    if (!disabled) setOpen(!open);
  };

  const highlightedOption = highlightedIndex >= 0 ? optionsList[highlightedIndex] : null;

  return (
    <div ref={containerRef} className={cn(styles.dropdown, className)}>
      <Input
        disabled={disabled}
        value={value?.value ?? ''}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
        readOnly
        role={'combobox'}
        aria-haspopup={'listbox'}
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={highlightedOption ? getOptionId(highlightedOption.key) : undefined}
        afterSlot={
          <Button
            type={'button'}
            className={cn(styles.iconButton, open && styles.iconButtonOpen)}
            onClick={handleIconButtonClick}
            aria-label={open ? 'Закрыть список' : 'Открыть список'}
            tabIndex={-1}
          >
            <ArrowDownIcon color={'secondary'} />
          </Button>
        }
        autoComplete={'off'}
      />

      {open && !disabled && (
        <div id={listboxId} role={'listbox'} className={styles.list}>
          {optionsList.length === 0 ? (
            <Typography view={'p-16'} className={styles.emptyOption}>
              Нет вариантов
            </Typography>
          ) : (
            optionsList.map((opt, index) => (
              <DropdownOptionItem
                key={opt.key}
                option={opt}
                isSelected={selectedKey === opt.key}
                isHighlighted={index === highlightedIndex}
                optionId={getOptionId(opt.key)}
                onSelect={handleSelect}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};
