'use client';

import { Button } from '@components/ui/button';
import dynamic from 'next/dynamic';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const StateMessage = dynamic(
  () =>
    import('@components/state-message').then((mod) => ({
      default: mod.StateMessage,
    })),
  { ssr: false }
);

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
