'use client';

import { useEffect, useState } from 'react';

/**
 * Хук для безопасного рендеринга на клиенте без ошибок гидратации
 * Решает проблему расхождений между серверным и клиентским рендерингом
 * Использование:
 * const { isClient } = useClient();
 * return isClient ? <ClientComponent /> : <ServerComponent />;
 *
 * @see https://nextjs.org/docs/messages/react-hydration-error
 */
export const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  return { isClient };
};
