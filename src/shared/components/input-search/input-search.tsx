'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import type { FC } from 'react';

import styles from './input-search.module.scss';

type InputSearchProps = {
  searchTerm: string;
  onChangeAction: (value: string) => void;
  action: () => void;
};

export const InputSearch: FC<InputSearchProps> = (props) => {
  const { searchTerm, onChangeAction, action } = props;

  return (
    <div className={styles.inputSearch}>
      <Input value={searchTerm} onChange={onChangeAction} />
      <Button onClick={action}>Найти</Button>
    </div>
  );
};
