'use client';

import { AuthForms } from '@components/auth-forms';
import { registerFormConfig } from '@configs/auth-forms-config';
import { useRegisterWithEmailMutation } from '@queries/auth';

export const RegisterForm = () => {
  const registerWithEmail = useRegisterWithEmailMutation();

  return (
    <AuthForms
      config={registerFormConfig}
      onSubmitAction={(values) =>
        registerWithEmail.mutate({
          displayName: values.displayName,
          email: values.email,
          password: values.password,
        })
      }
      isSubmitting={registerWithEmail.isPending || registerWithEmail.isSuccess}
    />
  );
};
