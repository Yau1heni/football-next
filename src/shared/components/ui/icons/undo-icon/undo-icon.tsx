import { type IconProps } from '@components/ui/icons';
import type { FC } from 'react';

import { Icon } from '../icon';

export const UndoIcon: FC<IconProps> = (props) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path
      d="M3 10h10a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M3 10l4-4M3 10l4 4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
