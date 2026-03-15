'use client';

import { PageTitle } from '@components/page-title';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useClient } from '@hooks/use-client';
import { noop } from '@tanstack/react-query';
import type { FC } from 'react';

import { useTacticsBoard } from '../../_hooks/use-tactics-board';
import { useTacticsDndState } from '../../_hooks/use-tactics-dnd-state';
import { useTacticsDrawing } from '../../_hooks/use-tactics-drawing';
import { useTacticsHighlightedSlot } from '../../_hooks/use-tactics-highlighted-slot';
import { useTacticsMobileDrag } from '../../_hooks/use-tactics-mobile-drag';
import { useTacticsViewMode } from '../../_hooks/use-tactics-view-mode';
import { FieldContainer, FieldSvg } from '../field';
import { PlayerJersey } from '../players';
import { PlayersBench } from '../players';
import { TacticsControls } from '../tactics-controls';
import { TacticsField } from '../tactics-field';

export const TacticsPageContent: FC = () => {
  const { isClient } = useClient();

  const board = useTacticsBoard();
  const {
    players,
    formationId,
    slots,
    occupiedSlots,
    setLastPointer,
    setFieldRect,
    fieldRectRef,
    lastPointerRef,
    handleDragStart,
    handleDragEnd,
    onFormationChangeAction,
    onResetLineupAction,
  } = board;

  const dnd = useTacticsDndState(players, handleDragStart, handleDragEnd);

  const highlightedSlotIndex = useTacticsHighlightedSlot(
    slots,
    occupiedSlots,
    players,
    dnd.activeId,
    dnd.overId,
    dnd.dropPositionPercent
  );

  const { sensors } = useTacticsMobileDrag(
    dnd.activeId,
    dnd.setDropPositionPercent,
    fieldRectRef,
    lastPointerRef
  );

  const viewMode = useTacticsViewMode();
  const drawing = useTacticsDrawing();

  if (!isClient) {
    return (
      <>
        <PageTitle title="Тактическая доска" showBack />
        <TacticsControls
          formationId={formationId}
          onFormationChangeAction={onFormationChangeAction}
          viewMode="drag"
          onViewModeChangeAction={noop}
          strokeColor="white"
          onStrokeColorChangeAction={noop}
          hasStrokes={false}
          onClearDrawingAction={noop}
          canUndo={false}
          onUndoStrokeAction={noop}
          canRedo={false}
          onRedoStrokeAction={noop}
          hasPlayersOnField={false}
          onResetLineupAction={noop}
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
        viewMode={viewMode.viewMode}
        onViewModeChangeAction={viewMode.onViewModeChangeAction}
        strokeColor={drawing.strokeColor}
        onStrokeColorChangeAction={drawing.setStrokeColor}
        hasStrokes={drawing.hasStrokes}
        onClearDrawingAction={drawing.onClearDrawingAction}
        canUndo={drawing.canUndo}
        onUndoStrokeAction={drawing.onUndoStrokeAction}
        canRedo={drawing.canRedo}
        onRedoStrokeAction={drawing.onRedoStrokeAction}
        hasPlayersOnField={board.hasPlayersOnField}
        onResetLineupAction={onResetLineupAction}
      />
      <DndContext
        sensors={sensors}
        onDragStart={dnd.onDragStart}
        onDragOver={dnd.onDragOver}
        onDragEnd={dnd.onDragEnd}
      >
        <TacticsField
          players={players}
          slots={slots}
          occupiedSlots={occupiedSlots}
          showFormationSlots={true}
          onFieldPointerMoveAction={setLastPointer}
          onFieldRectChangeAction={setFieldRect}
          onDropPositionChangeAction={dnd.activeId != null ? dnd.setDropPositionPercent : undefined}
          highlightedSlotIndex={highlightedSlotIndex}
          isDrawMode={viewMode.isDrawMode}
          drawingStrokes={drawing.drawingStrokes}
          strokeColor={drawing.strokeColor}
          onDrawingStrokeEnd={drawing.onDrawingStrokeEnd}
        />
        <PlayersBench players={players} dragDisabled={viewMode.isDrawMode} />
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
