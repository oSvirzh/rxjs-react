import React from 'react';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/core/hooks/useAuth';
import { Button } from '@/shared/components/button/button.component';

export const HomePage: React.FC = () => {
  const { user, logout, authStatus } = useAuth();

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Hello {user ? `${user.username} (${user.id})` : 'World'}!</h1>
        {authStatus ? (
          <Link to="/" onClick={logout}>
            <Button label="Logout" />
          </Link>
        ) : (
          <Link to="/login">
            <Button label="Login" />
          </Link>
        )}
      </div>
    </div>
  );
};
