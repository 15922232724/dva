import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';
const routesConfig = app => ({
  path: '/dict',
  title: '字典管理',
  indexRoute: '/dict/list',
  component: EmptyLayout,
  childRoutes:[
    dictListApp(app),
    EditApp(app),
    dictValueListApp(app),
    dictValueEditApp(app),
  ]
});

const dictListApp = app => createRoute(app, (app => ({
  path: '/dict/list',
  title: '字典列表',
  component: dynamicWrapper(app, [import('./model/dictModel')], () => import('./components/list/dictList'))
})))
const dictValueListApp = app => createRoute(app, (app => ({
  path: '/dict/value/:id',
  title: '字典数据',
  component: dynamicWrapper(app, [import('./model/dictModel')], () => import('./components/value/dictList'))
})))
const dictValueEditApp = app => createRoute(app, (app => ({
  path: '/dict/editvalue',
  title: '字典值编辑',
  component: dynamicWrapper(app, [import('./model/dictModel')], () => import('./components/valueEdit/dictValueEdit'))
})))
const EditApp = app => createRoute(app, (app => ({
  path: '/dict/edit',
  title: '字典编辑',
  component: dynamicWrapper(app, [import('./model/dictModel')], () => import('./components/edit/dictEdit'))
})))

// const AllocationApp = app => createRoute(app, (app => ({
//   path: '/role/allocation/:id',
//   title: '角色分配',
//   component: dynamicWrapper(app, [import('./model/roleModel'),import('@/routes/Setting/User/model/userModel')], () => import('./components/allocation/allocationList'))
// })))
export default app => createRoute(app, routesConfig);
