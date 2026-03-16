/**
 * Майка с номером игрока. На поле — и draggable, и droppable (id = player.id), чтобы дроп на карточку = обмен.
 */

import { JerseyIcon } from '@components/ui/icons';
import { Typography } from '@components/ui/typography';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import type { PlayerOnBoard } from '@shared-types/tactics.types';
import cn from 'classnames';
import type { FC } from 'react';
import { useCallback } from 'react';

import styles from './player-jersey.module.scss';

type PlayerJerseyProps = {
  player: PlayerOnBoard;
  /** При рендере на поле — позиция в %; на скамейке не передавать */
  position?: { x: number; y: number };
  /** В режиме «Рисовать» перетаскивание отключено */
  dragDisabled?: boolean;
};

export const PlayerJersey: FC<PlayerJerseyProps> = ({ player, position, dragDisabled = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
  } = useDraggable({
    id: player.id,
    disabled: dragDisabled,
  });
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: player.id,
    disabled: position == null || dragDisabled,
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      setDraggableRef(node);
      setDroppableRef(node);
    },
    [setDraggableRef, setDroppableRef]
  );

  const style =
    position != null
      ? {
          position: 'absolute' as const,
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
        }
      : undefined;

  return (
    <div
      ref={setRefs}
      className={cn(styles.jersey, dragDisabled && styles.jerseyDisabled)}
      style={style}
      {...(dragDisabled ? {} : listeners)}
      {...(dragDisabled ? {} : attributes)}
      title={`Игрок ${player.number}`}
    >
      <JerseyIcon className={styles.jerseyShape} />
      <Typography color={'light'} tag={'span'} className={styles.jerseyNumber}>
        {player.number}
      </Typography>
    </div>
  );
};
