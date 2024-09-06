import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { MainLayout } from '@/app/layout/main-layout/main-layout.component';
import { HomePage } from '@/pages/home/home.page';
import { LoginPage } from '@/pages/login/login.page';

const rootRoute = createRootRoute({
  component: MainLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({
  routeTree,
});

export default router;
