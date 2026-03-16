import { Typography } from '@components/ui/typography';
import { Team } from '@shared-types/standings.types';
import Image from 'next/image';

import styles from './team-cell.module.scss';

type TeamCellProps = {
  team: Team;
};

export const TeamCell = ({ team }: TeamCellProps) => (
  <div className={styles.team}>
    <Image src={team.crest} alt={team.name} width={24} height={24} className={styles.teamCrest} />
    <Typography tag={'span'} className={styles.teamName}>
      {team.name}
    </Typography>
  </div>
);
