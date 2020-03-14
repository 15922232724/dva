import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';

const pathBase = 'parameter';
const sourceName = '系统参数';

const routesConfig = app => ({
  path: `/${pathBase}`,
  title: `${sourceName}管理`,
  indexRoute: `/${pathBase}/list`,
  component: EmptyLayout,
  childRoutes:[
    ListApp(app),
    EditApp(app),
  ]
});

const ListApp = app => createRoute(app, (app => ({
  path: `/${pathBase}/list`,
  title: `${sourceName}列表`,
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/list/List'))
})))
const EditApp = app => createRoute(app, (app => ({
  path: `/${pathBase}/edit`,
  title: `${sourceName}编辑`,
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/edit/Edit'))
})))

export default app => createRoute(app, routesConfig);
