/**
 * Скамейка запасных: ряд маек без position. useDroppable с id='bench' —
 * при дропе сюда в useTacticsBoard игрок снимается с поля (moveToBench).
 */

import { useDroppable } from '@dnd-kit/core';
import type { PlayerOnBoard } from '@shared-types/tactics.types';
import type { FC } from 'react';

import { PlayerJersey } from '../player-jersey';
import styles from './players-bench.module.scss';

const BENCH_DROPPABLE_ID = 'bench';

type PlayersBenchProps = {
  players: PlayerOnBoard[];
};

export const PlayersBench: FC<PlayersBenchProps> = ({ players }) => {
  const { setNodeRef } = useDroppable({ id: BENCH_DROPPABLE_ID });
  const onBench = players.filter((p) => p.position == null);

  return (
    <div ref={setNodeRef} className={styles.bench} data-droppable>
      {onBench.map((player) => (
        <PlayerJersey key={player.id} player={player} />
      ))}
    </div>
  );
};
