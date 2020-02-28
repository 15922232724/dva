import React from 'react';
import dynamic from 'dva/dynamic';
import { Route, Switch, Redirect } from 'dva/router';
import assign from 'object-assign';




/**
 * 生成一组路由
 * @param {*} app
 * @param {*} routesConfig
 */
export const createRoutes = (app, routesConfig) => {
  return (
    <Switch>
      {routesConfig(app).map(config => createRoute(app, () => config))}
    </Switch>
  );
};
// 路由映射表
window.dva_router_pathMap = {};
/**
 * 生成单个路由
 * @param {*} app
 * @param {*} routesConfig
 */
export const createRoute = (app, routesConfig) => {
  const {
    component: Comp,
    path,
    indexRoute,
    title,
    exact,
    ...otherProps
  } = routesConfig(app);
  if (path && path !== '/') {
    window.dva_router_pathMap[path] = { path, title, ...otherProps };
    // 为子路由增加parentPath
    if (otherProps.childRoutes && otherProps.childRoutes.length) {
      otherProps.childRoutes.forEach(item => {
        if (window.dva_router_pathMap[item.key]) {
          window.dva_router_pathMap[item.key].parentPath = path;
        }
      });
    }
  }
  const routeProps = assign(
    {
      key: path,
      render: props => (
        <Comp routerData={otherProps} {...props} />
      )
    },
    path && {
      path: path
    },
    exact && {
      exact: exact
    }
  );

  if (indexRoute) {
    return [
      <Redirect key={path + '_redirect'} exact from={path} to={indexRoute} />,
      <Route {...routeProps} />
    ];
  }

  return <Route {...routeProps} />;
};
