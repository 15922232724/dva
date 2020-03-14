import { dynamicWrapper, createRoute } from '@/utils/core';
import EmptyLayout from '@/layouts/EmptyLayout';

const pathBase = 'file-bucket';
const sourceName = '对象存储空间';

const routesConfig = app => createRoute(app,(app=>({
  path: `/${pathBase}`,
  title: `${sourceName}管理`,
  indexRoute: `/${pathBase}/list`,
  component: EmptyLayout,
  childRoutes:[
    ListApp(app),
    FileListRoutes(app),
    EditApp(app),
  ]
})));

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

const fileSourceName = '对象存储';
const filePathBase = 'file';

const FileListRoutes  = app => createRoute(app,(app=>({
  path: `/${pathBase}/${filePathBase}`,
  title: `${fileSourceName}管理`,
  indexRoute: `/${pathBase}/${filePathBase}/list`,
  component: EmptyLayout,
  childRoutes:[
    FileListApp(app),
  ]
})));
const FileListApp = app => createRoute(app, (app => ({
  path: `/${pathBase}/${filePathBase}/:id/list`,
  title: `${fileSourceName}列表`,
  
  component: dynamicWrapper(app, [import('./model/Model')], () => import('./components/fileList/List'))
})))

export default routesConfig;
