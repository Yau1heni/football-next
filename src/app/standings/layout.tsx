import { ProtectedRoute } from '@components/protected-route';
import type { ReactNode } from 'react';

const StandingsLayout = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default StandingsLayout;
