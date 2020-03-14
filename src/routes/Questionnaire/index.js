import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';

const pathBase = 'admin';

const routesConfig = app => ({
  path: `/${pathBase}`,
  indexRoute: `/${pathBase}/question`,
  component: EmptyLayout,
  childRoutes: [
    HomeApp(app),
    // EditApp(app),
  ]
});

const HomeApp = app => createRoute(app, (app => ({
  path: `/${pathBase}/question`,
  title: `调查问卷统计`,

  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/home/Home'))
})))

export default app => createRoute(app, routesConfig);
