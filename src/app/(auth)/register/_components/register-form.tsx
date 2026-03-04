'use client';

import { AuthForms } from '@components/auth-forms';
import { registerFormConfig } from '@configs/auth-forms-config';
import { useRegisterWithEmailMutation } from '@queries/auth';

export const RegisterForm = () => {
  const registerWithEmail = useRegisterWithEmailMutation();

  return (
    <AuthForms
      config={registerFormConfig}
      onSubmit={(values) =>
        registerWithEmail.mutate({
          displayName: values.displayName,
          email: values.email,
          password: values.password,
        })
      }
      isSubmitting={registerWithEmail.isPending}
      submitError={registerWithEmail.error}
    />
  );
};
