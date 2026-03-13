import type { IconProps } from '@components/ui/icons';
import {
  InstagramIcon,
  SocialDefaultIcon,
  TgIcon,
  VkIcon,
  YoutubeIcon,
} from '@components/ui/icons';
import type { FC } from 'react';

const SOCIAL_ICON_MAP: Record<string, FC<IconProps>> = {
  instagram: InstagramIcon,
  telegram: TgIcon,
  vk: VkIcon,
  youtube: YoutubeIcon,
  twitter: SocialDefaultIcon,
  facebook: SocialDefaultIcon,
};

/**
 * Возвращает иконку соцсети по имени (регистронезависимо).
 */
export const getSocialIcon = (name: string): FC<IconProps> => {
  const key = name.toLowerCase();
  return SOCIAL_ICON_MAP[key] ?? SocialDefaultIcon;
};
