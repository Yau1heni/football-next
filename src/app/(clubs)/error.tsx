'use client';

import { StateMessage } from '@components/state-message';
import { Button } from '@components/ui/button';
import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ClubsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StateMessage
      variant="error"
      action={
        <Button onClick={reset} variant="primary">
          Попробовать снова
        </Button>
      }
    />
  );
}
