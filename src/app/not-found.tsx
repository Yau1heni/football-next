'use client';

import { routes } from '@configs/routes';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const StateMessage = dynamic(
  () =>
    import('@components/state-message').then((mod) => ({
      default: mod.StateMessage,
    })),
  { ssr: false }
);

const NotFound = () => {
  return (
    <StateMessage
      variant="empty"
      title="Страница не найдена"
      description="Запрашиваемая страница не существует или была перемещена"
      action={<Link href={routes.main.mask}>На главную</Link>}
    />
  );
};

export default NotFound;
