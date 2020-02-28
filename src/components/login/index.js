import { dynamicWrapper } from '../../utils/dynamic.js'
import { createRoute } from '../../utils/router'

const pathBase = 'login';

const routesConfig = app => ({
  path: `/${pathBase}`,
  title: `翻译`,
  indexRoute: `/${pathBase}/home`,
  childRoutes: [
    LoginApp(app),
    // EditApp(app),
  ]
});

const LoginApp = app => createRoute(app, (app => ({
  path: `/${pathBase}/login`,
  title: `首页`,
  component: dynamicWrapper(app, [import('./model')], () => import('./view'))
})))

export default app => createRoute(app, routesConfig);
