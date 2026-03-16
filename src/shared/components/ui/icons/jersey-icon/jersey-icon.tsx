import type { FC } from 'react';

import type { IconProps } from '../icon';
import { Icon } from '../icon';

export const JerseyIcon: FC<IconProps> = (props) => (
  <Icon viewBox="0 0 100 120" stroke="none" {...props}>
    <path d="M50 18 L38 14 L22 10 L2 18 L2 34 L14 50 L14 90 L14 98 L50 102 L86 98 L86 90 L86 50 L98 34 L98 18 L78 10 L62 14 Z" />
  </Icon>
);
