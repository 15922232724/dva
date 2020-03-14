import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';


const routesConfig = app => ({
  path: '/user',
  title: '用户管理',
  component: EmptyLayout,
  indexRoute: '/user/list',
  childRoutes:[
    userListApp(app),
    userEditApp(app),
    userViewApp(app),
  ]
});

const userListApp = app => createRoute(app, (app => ({
  path: '/user/list',
  title: '用户列表',
  component: dynamicWrapper(app, [import('./model/userModel'),import('../Organization/model/organizationModel')], () => import('./components/list/userList'))
})))
const userEditApp = app => createRoute(app, (app => ({
  path: '/user/edit',
  title: '用户编辑',
  component: dynamicWrapper(app, [import('./model/userModel'),import('../Organization/model/organizationModel')], () => import('./components/edit/userEdit'))
})))
const userViewApp = app => createRoute(app, (app => ({
  path: '/user/view/:id',
  title: '用户查看',
  component: dynamicWrapper(app, [import('./model/userModel')], () => import('./components/view/userView'))
})))


export default app => createRoute(app, routesConfig);
