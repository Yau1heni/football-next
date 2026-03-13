import { useDropdownBase } from '@hooks/use-dropdown-base';

export type DropdownOption = {
  key: string;
  value: string;
};

export const useDropdown = (
  options: DropdownOption[],
  value: DropdownOption | null,
  onChange: (value: DropdownOption | null) => void
) => {
  const {
    open,
    setOpen,
    highlightedIndex,
    selectOption,
    handleKeyDown,
    containerRef,
    listboxId,
    getOptionId,
  } = useDropdownBase(options, onChange, true);

  const selectedKey = value?.key ?? null;

  return {
    open,
    setOpen,
    handleSelect: selectOption,
    handleKeyDown,
    containerRef,
    selectedKey,
    highlightedIndex,
    listboxId,
    getOptionId,
    options,
  };
};
