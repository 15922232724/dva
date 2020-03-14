import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';

const pathBase = 'demo';
const sourceName = 'DEMO';

const routesConfig = app => ({
  path: `/${pathBase}`,
  title: `DEMO`,
  indexRoute: `/${pathBase}/home`,
  component: EmptyLayout,
  childRoutes:[
    HomeApp(app),
    // EditApp(app),
  ]
});

const HomeApp = app => createRoute(app, (app => ({
  path: `/${pathBase}/home`,
  title: `首页`,
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/home/Home'))
})))

export default app => createRoute(app, routesConfig);
