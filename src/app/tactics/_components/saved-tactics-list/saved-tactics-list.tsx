import { Typography } from '@components/ui/typography';
import type { SavedTacticListItem } from '@shared-types/tactics.types';
import type { FC } from 'react';

import styles from './saved-tactics-list.module.scss';
import { SavedTacticsListRow } from './saved-tactics-list-row';

type SavedTacticsListProps = {
  items: SavedTacticListItem[];
  creatorName: string;
  onApplyAction: (tacticId: string) => void;
  applyingTacticId: string | null;
  onDeleteAction: (tacticId: string) => void;
  deletingTacticId: string | null;
};

export const SavedTacticsList: FC<SavedTacticsListProps> = (props) => {
  const { items, creatorName, onApplyAction, applyingTacticId, onDeleteAction, deletingTacticId } =
    props;

  if (items.length === 0) {
    return (
      <Typography tag="p" view="p-14" color="secondary">
        Нет сохранённых схем
      </Typography>
    );
  }

  return (
    <ul className={styles.list} aria-label="Сохранённые тактические схемы">
      {items.map((item) => (
        <SavedTacticsListRow
          key={item.id}
          item={item}
          creatorName={creatorName}
          onApplyAction={onApplyAction}
          onDeleteAction={onDeleteAction}
          applyingTacticId={applyingTacticId}
          deletingTacticId={deletingTacticId}
        />
      ))}
    </ul>
  );
};
