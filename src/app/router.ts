import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { MainLayout } from '@/app/layout/main-layout/main-layout.component';
import { HomePage } from '@/pages/home/home.page';
import { LoginPage } from '@/pages/login/login.page';

const rootRoute = createRootRoute({
  component: MainLayout,
});

export const routes = {
  homePage: {
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
  },
  loginPage: {
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
  },
};

const routeTree = rootRoute.addChildren(Object.values(routes).map((item) => createRoute(item)));

const router = createRouter({
  routeTree,
});

export default router;
