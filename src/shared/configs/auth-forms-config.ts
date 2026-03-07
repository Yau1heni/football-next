import { routes } from '@configs/routes';
import { LOGIN_PAGE_TITLE_ID, REGISTER_PAGE_TITLE_ID } from '@constants/auth';
import type { FieldValidator } from '@hooks/use-form-validation';
import { validateEmail, validatePassword, validateRequired } from '@utils/auth-validation';

export type AuthFormFieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
  autoComplete?: string;
};

export type AuthFormConfig = {
  title: string;
  titleId: string;
  fields: AuthFormFieldConfig[];
  initialValues: Record<string, string>;
  validators: Record<string, FieldValidator>;
  submitLabel: string;
  oauthLabel: string;
  linkTo: string;
  linkText: string;
};

export const loginFormConfig: AuthFormConfig = {
  title: 'Войти',
  titleId: LOGIN_PAGE_TITLE_ID,
  fields: [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'example@mail.com',
      type: 'email',
      autoComplete: 'email',
    },
    {
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      type: 'password',
      autoComplete: 'current-password',
    },
  ],
  initialValues: { email: '', password: '' },
  validators: {
    email: validateEmail,
    password: validatePassword,
  },
  submitLabel: 'Войти',
  oauthLabel: 'или войти через',
  linkTo: routes.register.mask,
  linkText: 'Зарегистрироваться',
};

export const registerFormConfig: AuthFormConfig = {
  title: 'Зарегистрироваться',
  titleId: REGISTER_PAGE_TITLE_ID,
  fields: [
    {
      name: 'displayName',
      label: 'Имя',
      placeholder: 'Как к вам обращаться',
      type: 'text',
      autoComplete: 'name',
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'example@mail.com',
      type: 'email',
      autoComplete: 'email',
    },
    {
      name: 'password',
      label: 'Пароль',
      placeholder: 'Не менее 5 символов',
      type: 'password',
      autoComplete: 'new-password',
    },
  ],
  initialValues: { displayName: '', email: '', password: '' },
  validators: {
    displayName: validateRequired,
    email: validateEmail,
    password: validatePassword,
  },
  submitLabel: 'Зарегистрироваться',
  oauthLabel: 'или зарегистрироваться через',
  linkTo: routes.login.mask,
  linkText: 'Войти',
};
