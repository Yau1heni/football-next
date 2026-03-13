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

type ArticleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ArticleError = ({ reset }: ArticleErrorProps) => (
  <StateMessage
    variant="error"
    action={
      <Button onClick={reset} variant="primary">
        Попробовать снова
      </Button>
    }
  />
);

export default ArticleError;
