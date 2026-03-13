import { Button } from '@components/ui/button';
import { ArrowDownIcon } from '@components/ui/icons';
import { Input } from '@components/ui/input';
import cn from 'classnames';
import type { FC } from 'react';

import { DropdownList } from '../multi-dropdown/dropdown-list';
import styles from './multi-dropdown.module.scss';
import { useMultiDropdown } from './use-multi-dropdown';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

export const MultiDropdown: FC<MultiDropdownProps> = (props) => {
  const { options, className, value, onChange, getTitle, disabled } = props;

  const {
    open,
    setOpen,
    search,
    handleSearchChange,
    filteredOptions,
    handleSelect,
    handleKeyDown,
    containerRef,
    selectedKeys,
    highlightedIndex,
    listboxId,
    getOptionId,
  } = useMultiDropdown(options, value, onChange);

  const getInputValue = () => {
    if (open) return search;
    if (value.length > 0) return getTitle(value);

    return '';
  };

  const handleFocus = () => {
    setOpen(true);
    handleSearchChange('');
  };

  const handleIconButtonClick = () => {
    if (!disabled) setOpen(!open);
  };

  const highlightedOption = highlightedIndex >= 0 ? filteredOptions[highlightedIndex] : null;

  return (
    <div ref={containerRef} className={cn(styles.multiDropdown, className)}>
      <Input
        disabled={disabled}
        className={styles.input}
        value={getInputValue()}
        placeholder={getTitle(value)}
        onFocus={handleFocus}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        readOnly={disabled}
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
        id={'multiDropdown'}
      />

      <DropdownList
        open={open}
        disabled={disabled}
        filteredOptions={filteredOptions}
        onSelect={handleSelect}
        selectedKeys={selectedKeys}
        listboxId={listboxId}
        highlightedIndex={highlightedIndex}
        getOptionId={getOptionId}
      />
    </div>
  );
};
