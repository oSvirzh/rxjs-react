import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/core/hooks/useAuth';
import { Credentials } from '@/shared/types/credentials.model';
import { routes } from '@/app/router';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login, authError, authStatus } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as Credentials;
    login(data);
    event.stopPropagation();
  };

  useEffect(() => {
    if (authStatus) {
      navigate({ to: routes.homePage.path });
    }
  }, [authStatus]);

  return { handleSubmit, error: authError, authStatus };
};
