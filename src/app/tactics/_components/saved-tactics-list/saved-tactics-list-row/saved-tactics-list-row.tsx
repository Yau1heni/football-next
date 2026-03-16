import { Button } from '@components/ui/button';
import { Typography } from '@components/ui/typography';
import type { SavedTacticListItem } from '@shared-types/tactics.types';
import { formatTimestamp } from '@utils/format-timestamp';
import type { FC } from 'react';
import { useCallback } from 'react';

import styles from '../saved-tactics-list.module.scss';

type SavedTacticsListRowProps = {
  item: SavedTacticListItem;
  creatorName: string;
  onApplyAction: (tacticId: string) => void;
  onDeleteAction: (tacticId: string) => void;
  applyingTacticId: string | null;
  deletingTacticId: string | null;
};

export const SavedTacticsListRow: FC<SavedTacticsListRowProps> = (props) => {
  const { item, creatorName, onApplyAction, onDeleteAction, applyingTacticId, deletingTacticId } =
    props;

  const handleApply = useCallback(() => {
    onApplyAction(item.id);
  }, [item.id, onApplyAction]);

  const handleDelete = useCallback(() => {
    onDeleteAction(item.id);
  }, [item.id, onDeleteAction]);

  return (
    <li className={styles.item}>
      <div className={styles.meta}>
        <Typography tag="span" view="p-14" className={styles.name}>
          {item.name}
        </Typography>
        <Typography tag="span" view="p-14" color="secondary">
          {creatorName}
        </Typography>
        <Typography tag="span" view="p-14" color="secondary">
          {formatTimestamp(item.createdAt)}
        </Typography>
      </div>
      <div className={styles.actions}>
        <Button
          variant="primary"
          className={styles.applyButton}
          onClick={handleApply}
          disabled={applyingTacticId != null}
          loading={applyingTacticId === item.id}
        >
          Применить
        </Button>
        <Button
          variant="ghost"
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={deletingTacticId != null}
          loading={deletingTacticId === item.id}
        >
          Удалить
        </Button>
      </div>
    </li>
  );
};
