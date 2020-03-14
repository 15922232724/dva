import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';

const pathBase = 'accountsetting';
const sourceName = '账号设置';

const routesConfig = app => ({
  path: `/${pathBase}`,
  title: `${sourceName}`,
  indexRoute: `/${pathBase}/edit`,
  component: EmptyLayout,
  childRoutes:[
    // ListApp(app),
    EditApp(app),
    EditPassword(app),
  ]
});


const EditApp = app => createRoute(app, (app => ({
  path: `/${pathBase}/edit`,
  title: `${sourceName}`,
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/edit/Edit'))
})))
const EditPassword = app => createRoute(app, (app => ({
  path: `/${pathBase}/editpwd`,
  title: `${sourceName}`,
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/editPassword/Edit'))
})))

export default app => createRoute(app, routesConfig);
