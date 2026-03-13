'use client';

import { Button } from '@components/ui/button';
import dynamic from 'next/dynamic';

const StateMessage = dynamic(
  () =>
    import('@components/state-message').then((mod) => ({
      default: mod.StateMessage,
    })),
  { ssr: false }
);

type ClubsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ClubsError = ({ error, reset }: ClubsErrorProps) => (
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

export default ClubsError;
