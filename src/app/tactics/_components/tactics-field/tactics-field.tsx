/**
 * Область поля с разметкой, слотами формации и игроками на поле.
 * Передаём в хук clientX/clientY при pointer move и rect при монтировании/ресайзе;
 * проценты считаются в момент дропа по актуальному rect.
 */

import { useDroppable } from '@dnd-kit/core';
import type { FormationShape, PlayerOnBoard } from '@shared-types/tactics.types';
import type { FC } from 'react';

import { FieldContainer, FieldSvg, FormationSlots } from '../field';
import { PlayerJersey } from '../players';
import styles from './tactics-field.module.scss';
import { useTacticsField } from './use-tactics-field';

const FIELD_DROPPABLE_ID = 'field';

type TacticsFieldProps = {
  players: PlayerOnBoard[];
  slots: FormationShape;
  occupiedSlots: Set<number>;
  showFormationSlots: boolean;
  onFieldPointerMoveAction: (clientX: number, clientY: number) => void;
  onFieldRectChangeAction: (rect: DOMRect | null) => void;
  onDropPositionChangeAction?: (pos: { x: number; y: number } | null) => void;
  highlightedSlotIndex?: number | null;
};

export const TacticsField: FC<TacticsFieldProps> = (props) => {
  const {
    players,
    slots,
    occupiedSlots,
    showFormationSlots,
    onFieldPointerMoveAction,
    onFieldRectChangeAction,
    onDropPositionChangeAction,
    highlightedSlotIndex,
  } = props;

  const { setNodeRef } = useDroppable({ id: FIELD_DROPPABLE_ID });

  const { setRef, handlePointerMove } = useTacticsField({
    onFieldPointerMoveAction,
    onFieldRectChangeAction,
    onDropPositionChangeAction,
    mergeWithRef: setNodeRef,
  });

  const onField = players.filter(
    (p): p is PlayerOnBoard & { position: { x: number; y: number } } => p.position != null
  );

  return (
    <FieldContainer className={styles.tacticsFieldWrapper}>
      <div ref={setRef} className={styles.droppableArea} onPointerMove={handlePointerMove}>
        <FieldSvg />
        {showFormationSlots && (
          <FormationSlots
            slots={slots}
            occupiedIndices={occupiedSlots}
            highlightedSlotIndex={highlightedSlotIndex ?? undefined}
          />
        )}
        {onField.map((player) => (
          <PlayerJersey key={player.id} player={player} position={player.position} />
        ))}
      </div>
    </FieldContainer>
  );
};
