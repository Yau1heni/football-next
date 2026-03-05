'use client';

import { StateMessage } from '@components/state-message';
import { Button } from '@components/ui/button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RootError = ({ error, reset }: ErrorProps) => {
  return (
    <StateMessage
      variant="error"
      description={error.message}
      action={
        <Button onClick={reset} variant="primary">
          Попробовать снова
        </Button>
      }
    />
  );
};

export default RootError;
