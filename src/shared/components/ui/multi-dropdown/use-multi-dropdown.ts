import { useDropdownBase } from '@hooks/use-dropdown-base';
import { useState } from 'react';

import type { Option } from './multi-dropdown';

export const useMultiDropdown = (
  options: Option[],
  value: Option[],
  onChange: (value: Option[]) => void
) => {
  const [search, setSearch] = useState('');

  const selectedKeys = new Set(value.map((v) => v.key));

  const filteredOptions = options.filter((opt) =>
    opt.value.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (option: Option) => {
    if (selectedKeys.has(option.key)) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const {
    open,
    setOpen,
    resetHighlight,
    highlightedIndex,
    selectOption,
    handleKeyDown,
    containerRef,
    listboxId,
    getOptionId,
  } = useDropdownBase(filteredOptions, handleToggle, false);

  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
    resetHighlight();
  };

  return {
    open,
    setOpen,
    search,
    handleSearchChange,
    filteredOptions,
    handleSelect: selectOption,
    handleKeyDown,
    containerRef,
    selectedKeys,
    highlightedIndex,
    listboxId,
    getOptionId,
  };
};
