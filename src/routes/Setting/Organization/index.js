import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';


const routesConfig = app => ({
  path: '/organization',
  title: '组织管理',
  component: EmptyLayout,
  indexRoute: '/organization/list',
  childRoutes:[
    organizationListApp(app),
    organizationEditApp(app),
    // userViewApp(app),
  ]
});

const organizationListApp = app => createRoute(app, (app => ({
  path: '/organization/list',
  title: '组织列表',
  component: dynamicWrapper(app, [import('./model/organizationModel')], () => import('./components/list/organizationList'))
})))
const organizationEditApp = app => createRoute(app, (app => ({
  path: '/organization/edit',
  title: '组织编辑',
  component: dynamicWrapper(app, [import('./model/organizationModel')], () => import('./components/edit/organizationEdit'))
})))
// const userViewApp = app => createRoute(app, (app => ({
//   path: '/user/view/:id',
//   title: '用户查看',
//   component: dynamicWrapper(app, [import('./model/userModel')], () => import('./components/view/userView'))
// })))


export default app => createRoute(app, routesConfig);
