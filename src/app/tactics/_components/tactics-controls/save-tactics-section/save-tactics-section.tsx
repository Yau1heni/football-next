'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import type { FC } from 'react';

import styles from '../tactics-controls.module.scss';

type TacticsSaveSectionProps = {
  canSaveTactics: boolean;
  showSaveForm: boolean;
  saveName: string;
  onSaveNameChangeAction: (name: string) => void;
  onSaveClickAction: () => void;
  onSaveSubmitAction: () => void;
  onSaveCancelAction: () => void;
  isSavePending: boolean;
};

export const TacticsSaveSection: FC<TacticsSaveSectionProps> = (props) => {
  const {
    canSaveTactics,
    showSaveForm,
    saveName,
    onSaveNameChangeAction,
    onSaveClickAction,
    onSaveSubmitAction,
    onSaveCancelAction,
    isSavePending,
  } = props;

  if (showSaveForm) {
    return (
      <div className={styles.section}>
        <Input
          value={saveName}
          onChange={onSaveNameChangeAction}
          placeholder="Название схемы"
          className={styles.saveNameInput}
          disabled={isSavePending}
          aria-label="Название схемы"
        />
        <Button
          variant="primary"
          onClick={onSaveSubmitAction}
          disabled={!canSaveTactics || !saveName.trim() || isSavePending}
        >
          {isSavePending ? 'Сохранение…' : 'Сохранить'}
        </Button>
        <Button variant="ghost" onClick={onSaveCancelAction} disabled={isSavePending}>
          Отмена
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <Button variant="ghost" onClick={onSaveClickAction} disabled={!canSaveTactics}>
        Сохранить схему
      </Button>
    </div>
  );
};
