'use client';

import { PageTitle } from '@components/page-title';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useClient } from '@hooks/use-client';
import type { FC } from 'react';
import { useCallback } from 'react';

import { useTacticsBoard } from '../../_hooks/use-tactics-board';
import { useTacticsDndState } from '../../_hooks/use-tactics-dnd-state';
import { useTacticsHighlightedSlot } from '../../_hooks/use-tactics-highlighted-slot';
import { FieldContainer, FieldSvg } from '../field';
import { PlayerJersey } from '../players';
import { PlayersBench } from '../players';
import { TacticsControls } from '../tactics-controls';
import { TacticsField } from '../tactics-field';
import styles from './tactics-page-content.module.scss';

export const TacticsPageContent: FC = () => {
  const { isClient } = useClient();

  const {
    players,
    formationId,
    setFormationId,
    moveAllToBench,
    slots,
    occupiedSlots,
    setLastPointer,
    setFieldRect,
    handleDragStart,
    handleDragEnd,
  } = useTacticsBoard();

  const dnd = useTacticsDndState(players, handleDragStart, handleDragEnd);

  const highlightedSlotIndex = useTacticsHighlightedSlot(
    slots,
    occupiedSlots,
    players,
    dnd.activeId,
    dnd.overId,
    dnd.dropPositionPercent
  );

  const onFormationChangeAction = useCallback(
    (id: string) => {
      setFormationId(id);
      moveAllToBench();
    },
    [setFormationId, moveAllToBench]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } })
  );

  if (!isClient) {
    return (
      <>
        <PageTitle title="Тактическая доска" showBack />
        <TacticsControls
          formationId={formationId}
          onFormationChangeAction={onFormationChangeAction}
        />
        <div className={styles.fieldWrap}>
          <FieldContainer>
            <FieldSvg />
          </FieldContainer>
        </div>
        <div className={styles.placeholderBench} aria-hidden />
      </>
    );
  }

  return (
    <>
      <PageTitle title="Тактическая доска" showBack />
      <TacticsControls
        formationId={formationId}
        onFormationChangeAction={onFormationChangeAction}
      />
      <DndContext
        sensors={sensors}
        onDragStart={dnd.onDragStart}
        onDragOver={dnd.onDragOver}
        onDragEnd={dnd.onDragEnd}
      >
        <PlayersBench players={players} />
        <div className={styles.fieldWrap}>
          <TacticsField
            players={players}
            slots={slots}
            occupiedSlots={occupiedSlots}
            showFormationSlots={true}
            onFieldPointerMoveAction={setLastPointer}
            onFieldRectChangeAction={setFieldRect}
            onDropPositionChangeAction={dnd.setDropPositionPercent}
            highlightedSlotIndex={highlightedSlotIndex}
          />
        </div>
        <DragOverlay dropAnimation={null}>
          {dnd.activePlayer != null ? (
            <div style={{ pointerEvents: 'none' }}>
              <PlayerJersey player={dnd.activePlayer} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};
