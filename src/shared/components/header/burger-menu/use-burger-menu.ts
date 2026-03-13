'use client';

import { APP_ROOT_ID } from '@constants/app';
import { KEYBOARD } from '@constants/keyboard';
import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

export type UseBurgerMenuReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export const useBurgerMenu = (): UseBurgerMenuReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD.ESC) close();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const root = document.getElementById(APP_ROOT_ID);
    const triggerElement = triggerRef.current;
    root?.setAttribute('inert', '');

    return () => {
      root?.removeAttribute('inert');
      if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle, triggerRef };
};
