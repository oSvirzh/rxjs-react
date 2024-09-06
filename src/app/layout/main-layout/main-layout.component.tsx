import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Header } from '@/shared/components/header/header.component';
import { Footer } from '@/shared/components/footer/footer.component';

export const MainLayout: React.FC = () => (
  <div className="flex justify-center">
    <div className="container flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
        <TanStackRouterDevtools />
      </main>
      <Footer />
    </div>
  </div>
);
