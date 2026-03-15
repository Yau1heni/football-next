'use client';

import { PageTitle } from '@components/page-title';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useClient } from '@hooks/use-client';
import { noop } from '@tanstack/react-query';
import type { FC } from 'react';

import { useSaveTacticsForm } from '../../_hooks/use-save-tactics-form';
import { useTacticsBoard } from '../../_hooks/use-tactics-board';
import { useTacticsDndState } from '../../_hooks/use-tactics-dnd-state';
import { useTacticsDrawing } from '../../_hooks/use-tactics-drawing';
import { useTacticsHighlightedSlot } from '../../_hooks/use-tactics-highlighted-slot';
import { useTacticsMobileDrag } from '../../_hooks/use-tactics-mobile-drag';
import { useTacticsViewMode } from '../../_hooks/use-tactics-view-mode';
import { FieldContainer, FieldSvg } from '../field';
import { PlayerJersey } from '../players';
import { PlayersBench } from '../players';
import { SavedTacticsSection } from '../saved-tactics-section';
import {
  TacticsControlsBar,
  TacticsDrawingTools,
  TacticsFormationPicker,
  TacticsLineupActions,
  TacticsSaveSection,
  TacticsStrokeColorPicker,
  TacticsViewModeSwitch,
} from '../tactics-controls';
import { TacticsField } from '../tactics-field';

export const TacticsPageContent: FC = () => {
  const { isClient } = useClient();

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
    applySavedTacticsAction,
    hasPlayersOnField,
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

  const { sensors } = useTacticsMobileDrag(
    dnd.activeId,
    dnd.setDropPositionPercent,
    fieldRectRef,
    lastPointerRef
  );

  const viewMode = useTacticsViewMode();
  const drawing = useTacticsDrawing();

  const saveForm = useSaveTacticsForm({
    players,
    formationId,
    drawingStrokes: drawing.drawingStrokes,
  });

  if (!isClient) {
    return (
      <>
        <PageTitle title="Тактическая доска" showBack />
        <TacticsControlsBar>
          <TacticsFormationPicker
            formationId={formationId}
            onFormationChangeAction={onFormationChangeAction}
          />
          <TacticsViewModeSwitch viewMode="drag" onViewModeChangeAction={noop} />
          <TacticsStrokeColorPicker
            strokeColor="white"
            onStrokeColorChangeAction={noop}
            isDrawMode={false}
          />
          <TacticsDrawingTools
            isDrawMode={false}
            hasStrokes={false}
            onClearDrawingAction={noop}
            canUndo={false}
            onUndoStrokeAction={noop}
            canRedo={false}
            onRedoStrokeAction={noop}
          />
          <TacticsLineupActions hasPlayersOnField={false} onResetLineupAction={noop} />
          <TacticsSaveSection
            canSaveTactics={false}
            showSaveForm={false}
            saveName=""
            onSaveNameChangeAction={noop}
            onSaveClickAction={noop}
            onSaveSubmitAction={noop}
            onSaveCancelAction={noop}
            isSavePending={false}
          />
        </TacticsControlsBar>
        <FieldContainer>
          <FieldSvg />
        </FieldContainer>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Тактическая доска" showBack />
      <SavedTacticsSection
        applySavedTacticsAction={applySavedTacticsAction}
        loadDrawingStrokesAction={drawing.loadDrawingStrokesAction}
      />
      <TacticsControlsBar>
        <TacticsFormationPicker
          formationId={formationId}
          onFormationChangeAction={onFormationChangeAction}
        />
        <TacticsViewModeSwitch
          viewMode={viewMode.viewMode}
          onViewModeChangeAction={viewMode.onViewModeChangeAction}
        />
        <TacticsStrokeColorPicker
          strokeColor={drawing.strokeColor}
          onStrokeColorChangeAction={drawing.setStrokeColor}
          isDrawMode={viewMode.isDrawMode}
        />
        <TacticsDrawingTools
          isDrawMode={viewMode.isDrawMode}
          hasStrokes={drawing.hasStrokes}
          onClearDrawingAction={drawing.onClearDrawingAction}
          canUndo={drawing.canUndo}
          onUndoStrokeAction={drawing.onUndoStrokeAction}
          canRedo={drawing.canRedo}
          onRedoStrokeAction={drawing.onRedoStrokeAction}
        />
        <TacticsLineupActions
          hasPlayersOnField={hasPlayersOnField}
          onResetLineupAction={onResetLineupAction}
        />
        <TacticsSaveSection
          canSaveTactics={saveForm.canSaveTactics}
          showSaveForm={saveForm.showSaveForm}
          saveName={saveForm.saveName}
          onSaveNameChangeAction={saveForm.setSaveName}
          onSaveClickAction={saveForm.onSaveClickAction}
          onSaveSubmitAction={saveForm.onSaveSubmitAction}
          onSaveCancelAction={saveForm.onSaveCancelAction}
          isSavePending={saveForm.isSavePending}
        />
      </TacticsControlsBar>
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
