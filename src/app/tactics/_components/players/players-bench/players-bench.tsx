/**
 * Скамейка запасных: ряд маек без position. useDroppable с id='bench' —
 * при дропе сюда в useTacticsBoard игрок снимается с поля (moveToBench).
 */

import { useDroppable } from '@dnd-kit/core';
import type { PlayerOnBoard } from '@shared-types/tactics.types';
import cn from 'classnames';
import type { FC } from 'react';

import { PlayerJersey } from '../player-jersey';
import styles from './players-bench.module.scss';

const BENCH_DROPPABLE_ID = 'bench';

type PlayersBenchProps = {
  players: PlayerOnBoard[];
  /** В режиме «Рисовать» дроп на скамейку и перетаскивание отключены */
  dragDisabled?: boolean;
};

export const PlayersBench: FC<PlayersBenchProps> = ({ players, dragDisabled = false }) => {
  const { setNodeRef } = useDroppable({ id: BENCH_DROPPABLE_ID, disabled: dragDisabled });
  const onBench = players.filter((p) => p.position == null);
  const isDisabled = dragDisabled;

  return (
    <div
      ref={setNodeRef}
      className={cn(styles.bench, isDisabled && styles.benchDisabled)}
      data-droppable
      aria-disabled={isDisabled}
    >
      {onBench.map((player) => (
        <PlayerJersey key={player.id} player={player} dragDisabled={dragDisabled} />
      ))}
    </div>
  );
};
