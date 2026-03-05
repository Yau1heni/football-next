import { StateMessage } from '@components/state-message';
import styles from '@components/ui/button/button.module.scss';
import { routes } from '@configs/routes';
import cn from 'classnames';
import Link from 'next/link';

const NotFound = () => {
  return (
    <StateMessage
      variant="empty"
      title="Страница не найдена"
      description="Запрашиваемая страница не существует или была перемещена"
      action={
        <Link href={routes.main.mask} className={cn(styles.button, styles.button_primary)}>
          На главную
        </Link>
      }
    />
  );
};

export default NotFound;
