import { ColorDotItem, ColoredDots } from '@components/colored-dots';
import type { ColumnDef } from '@components/table';
import { Typography } from '@components/ui/typography';
import { TableEntry } from '@shared-types/standings.types';

import { PointsCell } from './points-cell';
import { TeamCell } from './team-cell';

const FORM_COLORS: Record<string, string> = {
  W: 'green',
  D: 'grey',
  L: 'red',
};

export const FORM_LEGEND_ITEMS: ColorDotItem[] = [
  { letter: 'W', color: FORM_COLORS.W },
  { letter: 'D', color: FORM_COLORS.D },
  { letter: 'L', color: FORM_COLORS.L },
];

const parseFormToItems = (form: string | null | undefined): ColorDotItem[] => {
  if (!form?.trim()) return [];

  return form.split(',').map((char) => {
    const letter = char.toUpperCase().slice(0, 1);
    return { letter, color: FORM_COLORS[letter] };
  });
};

export const getTournamentColumns: ColumnDef<TableEntry>[] = [
  {
    key: 'position',
    header: '#',
    align: 'center',
    render: (row) => <Typography>{row.position}</Typography>,
  },
  {
    key: 'team',
    header: 'Команда',
    align: 'left',
    render: (row) => <TeamCell team={row.team} />,
  },
  {
    key: 'playedGames',
    header: 'И',
    align: 'center',
    hideOnMobile: true,
    render: (row) => <Typography>{row.playedGames}</Typography>,
  },
  {
    key: 'won',
    header: 'В',
    align: 'center',
    hideOnMobile: true,
    render: (row) => <Typography>{row.won}</Typography>,
  },
  {
    key: 'draw',
    header: 'Н',
    align: 'center',
    hideOnMobile: true,
    render: (row) => <Typography>{row.draw}</Typography>,
  },
  {
    key: 'lost',
    header: 'П',
    align: 'center',
    hideOnMobile: true,
    render: (row) => <Typography>{row.lost}</Typography>,
  },
  {
    key: 'goals',
    header: 'Голы',
    align: 'center',
    hideOnMobile: true,
    render: (row) => <Typography>{`${row.goalsFor}:${row.goalsAgainst}`}</Typography>,
  },
  {
    key: 'goalDifference',
    header: 'Разн.',
    align: 'center',
    hideOnTablet: true,
    hideOnMobile: true,
    render: (row) => <Typography>{row.goalDifference}</Typography>,
  },
  {
    key: 'points',
    header: 'О',
    align: 'center',
    render: (row) => <PointsCell points={row.points} />,
  },
  {
    key: 'form',
    header: 'Форма',
    align: 'left',
    hideOnTablet: true,
    hideOnMobile: true,
    render: (row) => {
      const items = parseFormToItems(row.form);
      if (items.length === 0) return '—';
      return <ColoredDots items={items} />;
    },
  },
];
