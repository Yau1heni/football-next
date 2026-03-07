import type { Metadata } from 'next';

import { RegisterForm } from './_components/register-form';

export const metadata: Metadata = { title: 'Зарегистрироваться' };

const RegisterPage = () => <RegisterForm />;

export default RegisterPage;
