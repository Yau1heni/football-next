import { Typography } from '@components/ui/typography';

export const PointsCell = ({ points }: { points: number }) => (
  <Typography tag={'span'}>{points}</Typography>
);
