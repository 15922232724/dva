import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
  path: '/admin/qusetion',
  title: '调查问卷统计',
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/home/Home'))
});

export default (app) => createRoute(app, routesConfig);
