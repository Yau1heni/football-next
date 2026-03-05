'use client';

import { StateMessage } from '@components/state-message';
import { Button } from '@components/ui/button';

type ClubErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ClubError = ({ error, reset }: ClubErrorProps) => (
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

export default ClubError;
