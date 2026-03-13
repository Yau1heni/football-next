'use client';

import { type AuthState, useAuth } from '@hooks/use-auth-state';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuth();

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
