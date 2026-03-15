import { type IconProps } from '@components/ui/icons';
import type { FC } from 'react';

import { Icon } from '../icon';

export const RedoIcon: FC<IconProps> = (props) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path
      d="M21 10H11a5 5 0 0 0-5 5v0a5 5 0 0 0 5 5h8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M21 10l-4-4M21 10l-4 4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Icon>
);
