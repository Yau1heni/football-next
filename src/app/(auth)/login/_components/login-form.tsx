'use client';

import { AuthForms } from '@components/auth-forms';
import { loginFormConfig } from '@configs/auth-forms-config';
import { useLoginWithEmailMutation } from '@queries/auth';

export const LoginForm = () => {
  const loginWithEmail = useLoginWithEmailMutation();

  return (
    <AuthForms
      config={loginFormConfig}
      onSubmitAction={(values) =>
        loginWithEmail.mutate({
          email: values.email,
          password: values.password,
        })
      }
      isSubmitting={loginWithEmail.isPending}
    />
  );
};
