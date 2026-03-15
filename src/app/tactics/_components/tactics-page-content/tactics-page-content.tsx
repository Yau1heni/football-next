'use client';

import { PageTitle } from '@components/page-title';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useClient } from '@hooks/use-client';
import type { FC } from 'react';
import { useCallback } from 'react';

import { useTacticsBoard } from '../../_hooks/use-tactics-board';
import { useTacticsDndState } from '../../_hooks/use-tactics-dnd-state';
import { useTacticsHighlightedSlot } from '../../_hooks/use-tactics-highlighted-slot';
import { useTacticsMobileDrag } from '../../_hooks/use-tactics-mobile-drag';
import { FieldContainer, FieldSvg } from '../field';
import { PlayerJersey } from '../players';
import { PlayersBench } from '../players';
import { TacticsControls } from '../tactics-controls';
import { TacticsField } from '../tactics-field';

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
    fieldRectRef,
    lastPointerRef,
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

  const { sensors } = useTacticsMobileDrag(
    dnd.activeId,
    dnd.setDropPositionPercent,
    fieldRectRef,
    lastPointerRef
  );

  if (!isClient) {
    return (
      <>
        <PageTitle title="Тактическая доска" showBack />
        <TacticsControls
          formationId={formationId}
          onFormationChangeAction={onFormationChangeAction}
        />
        <FieldContainer>
          <FieldSvg />
        </FieldContainer>
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
