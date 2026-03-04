'use client';

import { authApi, type RegisterWithEmailParams } from '@api/auth-api';
import { routes } from '@configs/routes';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { AUTH_MUTATION_KEYS } from './keys';

export const useLoginWithEmailMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.LOGIN_WITH_EMAIL,
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authApi.loginWithEmail(email, password);
    },
    onSuccess: () => router.push(routes.main.mask),
  });
};

export const useRegisterWithEmailMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.REGISTER_WITH_EMAIL,
    mutationFn: (data: RegisterWithEmailParams) => authApi.registerWithEmail(data),
    onSuccess: () => router.push(routes.main.mask),
  });
};

export const useAuthWithGoogleMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.AUTH_WITH_GOOGLE,
    mutationFn: () => authApi.withGoogle(),
    onSuccess: () => router.push(routes.main.mask),
  });
};

export const useAuthWithGithubMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.AUTH_WITH_GITHUB,
    mutationFn: () => authApi.withGithub(),
    onSuccess: () => router.push(routes.main.mask),
  });
};
