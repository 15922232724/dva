import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
  path: '/admin/writeoff',
  title: '观众管理',
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/home/Home'))
});

export default (app) => createRoute(app, routesConfig);
