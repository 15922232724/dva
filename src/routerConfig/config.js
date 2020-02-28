import Login from '../components/login'
import { createRoutes } from '../utils/router'

const routesConfig = app => [
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    childRoutes: [
      Login(app),
    ]
  },
  // {
  //   path: '/admin',
  //   title: '系统中心',
  //   indexRoute: '/admin/welcome',
  //   childRoutes: [
  //     Welcome(app)
  //   ]
  // },
];
export default app => createRoutes(app, routesConfig);