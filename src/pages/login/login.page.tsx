import React from 'react';
import { LoginForm } from '@/features/auth/components/login-form/login-form.component';

export const LoginPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <h1 className="mb-4 text-4xl font-bold">Login</h1>
    <LoginForm />
  </div>
);
