'use client';

import { Button } from '@components/ui/button';
import { ArrowDownIcon } from '@components/ui/icons';
import { Loader } from '@components/ui/loader';
import { Typography } from '@components/ui/typography';
import { useAuthContext } from '@contexts/auth';
import { useTacticsListQuery } from '@queries/tactics';
import type { DrawingStroke, PlayerOnBoard } from '@shared-types/tactics.types';
import type { FC } from 'react';
import { useState } from 'react';

import { useTacticsListActions } from '../../_hooks/use-tactics-list-actions';
import { SavedTacticsList } from '../saved-tactics-list';

const CREATOR_NAME_FALLBACK = 'Вы';

type SavedTacticsSectionProps = {
  applySavedTacticsAction: (formationId: string, players: PlayerOnBoard[]) => void;
  loadDrawingStrokesAction: (strokes: DrawingStroke[]) => void;
};

export const SavedTacticsSection: FC<SavedTacticsSectionProps> = (props) => {
  const { applySavedTacticsAction, loadDrawingStrokesAction } = props;

  const { user } = useAuthContext();

  const [isExpanded, setExpanded] = useState(false);

  const { data: items = [], isLoading } = useTacticsListQuery(user?.uid ?? '');

  const listActions = useTacticsListActions({
    applySavedTacticsAction,
    loadDrawingStrokesAction,
  });

  const creatorName = user?.displayName ?? user?.email ?? CREATOR_NAME_FALLBACK;

  return (
    <section aria-labelledby="saved-tactics-heading" style={{ marginBottom: '1rem' }}>
      <Button
        type="button"
        variant="ghost"
        id="saved-tactics-heading"
        onClick={() => setExpanded((prev) => !prev)}
        disabled={isLoading}
        aria-expanded={isExpanded}
        aria-controls="saved-tactics-content"
      >
        <Typography tag="span" view="sectionTitle">
          Сохранённые схемы
        </Typography>
        <span
          style={{
            display: 'inline-flex',
            transform: isExpanded ? 'rotate(180deg)' : undefined,
            transition: 'transform 0.2s ease',
          }}
          aria-hidden
        >
          <ArrowDownIcon width={20} height={20} />
        </span>
      </Button>
      {isExpanded && (
        <div id="saved-tactics-content" style={{ marginTop: '0.5rem' }}>
          {isLoading ? (
            <Loader size="s" />
          ) : (
            <SavedTacticsList
              items={items}
              creatorName={creatorName}
              onApplyAction={listActions.onApplyTacticsAction}
              applyingTacticId={listActions.applyingTacticId}
              onDeleteAction={listActions.onDeleteTacticsAction}
              deletingTacticId={listActions.deletingTacticId}
            />
          )}
        </div>
      )}
    </section>
  );
};
