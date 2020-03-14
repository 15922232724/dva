import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';
const routesConfig = app => ({
  path: '/role',
  title: '角色管理',
  indexRoute: '/role/list',
  component: EmptyLayout,
  childRoutes:[
    AllocationApp(app),
    RoleListApp(app),
    EditApp(app),
  ]
});

const RoleListApp = app => createRoute(app, (app => ({
  path: '/role/list',
  title: '角色列表',
  component: dynamicWrapper(app, [import('./model/roleModel')], () => import('./components/list/roleList'))
})))
const EditApp = app => createRoute(app, (app => ({
  path: '/role/edit',
  title: '角色编辑',
  component: dynamicWrapper(app, [import('./model/roleModel')], () => import('./components/edit/roleEdit'))
})))
const AllocationApp = app => createRoute(app, (app => ({
  path: '/role/allocation/:id',
  title: '角色分配',
  component: dynamicWrapper(app, [import('./model/roleModel'),import('@/routes/Setting/User/model/userModel')], () => import('./components/allocation/allocationList'))
})))
export default app => createRoute(app, routesConfig);
