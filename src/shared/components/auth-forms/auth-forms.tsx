'use client';

import { AuthContainer } from '@components/auth-container';
import { AuthFormField } from '@components/auth-form-field';
import { OAuthButtons } from '@components/oauth-buttons';
import { Button } from '@components/ui/button';
import { Typography } from '@components/ui/typography';
import type { AuthFormConfig } from '@configs/auth-forms-config';
import { useFormValidation } from '@hooks/use-form-validation';
import { useAuthWithGithubMutation, useAuthWithGoogleMutation } from '@queries/auth';
import Link from 'next/link';
import { type ComponentProps, type FC } from 'react';

import styles from './auth-forms.module.scss';

type AuthFormsProps = {
  config: AuthFormConfig;
  onSubmitAction: (values: Record<string, string>) => void;
  isSubmitting?: boolean;
};

export const AuthForms: FC<AuthFormsProps> = (props) => {
  const { config, onSubmitAction, isSubmitting = false } = props;

  const { values, validateAll, getFieldProps, isValid } = useFormValidation(
    config.initialValues as Record<string, string>,
    config.validators
  );

  const authWithGoogle = useAuthWithGoogleMutation();
  const authWithGithub = useAuthWithGithubMutation();

  const isLoading = isSubmitting || authWithGoogle.isPending || authWithGithub.isPending;

  const handleSubmit: NonNullable<ComponentProps<'form'>['onSubmit']> = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    onSubmitAction(values);
  };

  return (
    <AuthContainer title={config.title} titleId={config.titleId}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        aria-labelledby={config.titleId}
        noValidate
      >
        {config.fields.map((field) => (
          <AuthFormField
            key={field.name}
            fieldProps={getFieldProps(field.name)}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            autoComplete={field.autoComplete}
          />
        ))}
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={!isValid || isLoading}
          loading={isLoading}
        >
          {config.submitLabel}
        </Button>
      </form>
      <OAuthButtons
        label={config.oauthLabel}
        onGoogleClickAction={authWithGoogle.mutate}
        onGithubClickAction={authWithGithub.mutate}
        disabled={isLoading}
      />
      <div className={styles.linkWrapper}>
        <Link href={config.linkTo} aria-describedby={config.titleId}>
          <Typography>{config.linkText}</Typography>
        </Link>
      </div>
    </AuthContainer>
  );
};
