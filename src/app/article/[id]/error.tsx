'use client';

import { StateMessage } from '@components/state-message';
import { Button } from '@components/ui/button';

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
