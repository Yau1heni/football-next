import { KEYBOARD } from '@constants/keyboard';
import type { KeyboardEvent, RefObject } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

type DropdownBaseOption = {
  key: string;
};

type UseDropdownBaseResult<T extends DropdownBaseOption> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  closeDropdown: () => void;
  resetHighlight: () => void;
  highlightedIndex: number;
  selectOption: (option: T) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  listboxId: string;
  getOptionId: (key: string) => string;
};

/**
 * Base hook for dropdown components. Manages open/close state,
 * keyboard navigation, highlighted index, click-outside, and ARIA IDs.
 *
 * @param displayedOptions — the options currently shown in the list
 * @param onSelect — called when user selects an option (Enter or mouse)
 * @param closeOnSelect — whether to close the dropdown after selection (default: true)
 */
export const useDropdownBase = <T extends DropdownBaseOption>(
  displayedOptions: T[],
  onSelect: (option: T) => void,
  closeOnSelect = true
): UseDropdownBaseResult<T> => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const id = useId();
  const listboxId = `${id}-listbox`;
  const getOptionId = (key: string) => `${id}-option-${key}`;

  const closeDropdown = () => {
    setOpen(false);
    setHighlightedIndex(-1);
  };

  const resetHighlight = () => setHighlightedIndex(-1);

  const selectOption = (option: T) => {
    onSelect(option);
    if (closeOnSelect) closeDropdown();
  };

  const scrollOptionIntoView = (key: string) => {
    document.getElementById(getOptionId(key))?.scrollIntoView({ block: 'nearest' });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case KEYBOARD.ARROW_DOWN: {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setHighlightedIndex(0);
        } else {
          const nextIndex =
            highlightedIndex < displayedOptions.length - 1
              ? highlightedIndex + 1
              : highlightedIndex;

          setHighlightedIndex(nextIndex);
          scrollOptionIntoView(displayedOptions[nextIndex].key);
        }
        break;
      }

      case KEYBOARD.ARROW_UP: {
        e.preventDefault();
        if (open) {
          const nextIndex = highlightedIndex > 0 ? highlightedIndex - 1 : highlightedIndex;

          setHighlightedIndex(nextIndex);
          scrollOptionIntoView(displayedOptions[nextIndex].key);
        }
        break;
      }

      case KEYBOARD.ENTER:
        e.preventDefault();
        if (open && highlightedIndex >= 0 && highlightedIndex < displayedOptions.length) {
          selectOption(displayedOptions[highlightedIndex]);
        }
        break;

      case KEYBOARD.ESC:
        closeDropdown();
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    open,
    setOpen,
    closeDropdown,
    resetHighlight,
    highlightedIndex,
    selectOption,
    handleKeyDown,
    containerRef,
    listboxId,
    getOptionId,
  };
};
