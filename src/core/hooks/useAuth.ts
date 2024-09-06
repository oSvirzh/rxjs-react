import 'reflect-metadata';
import { useEffect, useState } from 'react';
import { AuthService } from '@/core/services/auth/auth.service';
import { container } from '@/core/container/di';
import { User } from '@/shared/types/user.model';
import { Credentials } from '@/shared/types/credentials.model';

export const useAuth = () => {
  const authService = container.resolve(AuthService);
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const authStatusSubscription = authService.authStatus$.subscribe(setAuthStatus);
    const authErrorSubscription = authService.authError$.subscribe(setAuthError);
    const userSubscription = authService.user$.subscribe(setUser);
    return () => {
      authStatusSubscription.unsubscribe();
      authErrorSubscription.unsubscribe();
      userSubscription.unsubscribe();
    };
  }, [authService]);

  return {
    user,
    authStatus,
    authError,
    login: (credentials: Credentials) => authService.login(credentials),
    logout: () => authService.logout(),
  };
};
