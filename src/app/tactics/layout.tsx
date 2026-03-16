import { ProtectedRoute } from '@components/protected-route';
import type { ReactNode } from 'react';

const TacticsLayout = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export default TacticsLayout;
