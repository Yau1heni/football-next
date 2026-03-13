'use client';

import { useThemeContext } from '@contexts/theme';
import { ToastContainer } from 'react-toastify/unstyled';

export const AppToasts = () => {
  const { theme } = useThemeContext();

  return <ToastContainer position="bottom-left" autoClose={3000} pauseOnHover theme={theme} />;
};
