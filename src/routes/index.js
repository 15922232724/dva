import { createRoutes } from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import FrontLayout from '@/layouts/FrontLayout';
import Page403 from './Pages/403';
import NotFound from './Pages/404';
import Page500 from './Pages/500';
import ScreenLock from './Widgets/ScreenLock';
import Coming from './Widgets/Coming';
import Gallery from './Widgets/Gallery';
import Result from './Widgets/Result';
import LevelRoute from './Widgets/LevelRoute';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Blank from './Blank';
import Toolbar from './Widgets/Toolbar';
import BaseComponent from './Widgets/BaseComponent';
import Column from './Widgets/Column';
import TransferTree from './Widgets/TransferTree';
import SearchBar from './Widgets/SearchBar';
import DataTable from './Widgets/DataTable';
import Form from './Widgets/Form';
import EC from './Widgets/Charts/EC';
import G2 from './Widgets/Charts/G2';
import Print from './Widgets/Print';
import Banner from './Widgets/Banner';
import Icon from './UI/Icon';
import Mask from './UI/Mask';
import Editor from './UI/Editor';
import CSSAnimate from './UI/CSSAnimate';
import Alerts from './UI/Alerts';
import Button from './UI/Button';
import CRUD from './Business/CRUD';
import CRUDDetail from './Business/CRUD/routers/Detail';
import User from './Setting/User';
import Role from './Setting/Role';
import Organization from './Setting/Organization';
import Dict from './Setting/Dict';
import Area from './Setting/Area';
import Parameter from './Setting/Parameter';
import FileBucket from './Setting/FileBucket';
import AccountSettings from './AccountSettings';
import FrontDemo from './Front/demo';
import ActiveInfo from './activeInfo'
import Questionnaire from './Questionnaire'

/**
 * 主路由配置
 * 
 * path 路由地址
 * component 组件
 * indexRoute 默认显示路由
 * childRoutes 所有子路由
 * NotFound 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = app => [

  {
    path: '/demo',
    title: 'DEMO',
    indexRoute: '/demo/home',
    component: FrontLayout,
    childRoutes: [
      FrontDemo(app),
      NotFound(),
    ]
  },
  {
    path: '/admin',
    indexRoute: '/admin/home',
    component: BasicLayout,
    childRoutes: [
      ActiveInfo(app),
      Questionnaire(app)

    ]
  },
  {
    path: '/',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [
      Login(app),

    ]

  },

  // {
  //   path: '/',
  //   title: '系统中心',
  //   component: BasicLayout,
  //   indexRoute: '/dashboard',
  //   childRoutes: [
  //     AccountSettings(app),
  //     FileBucket(app),
  //     Parameter(app),
  //     Area(app),
  //     Dict(app),
  //     Role(app),
  //     User(app),
  //     Organization(app),
  //     Dashboard(app),
  //     Blank(app),
  //     Toolbar(app),
  //     Column(),
  //     SearchBar(),
  //     EC(app),
  //     G2(app),
  //     Icon(),
  //     Mask(),
  //     Editor(),
  //     CSSAnimate(),
  //     Alerts(),
  //     Button(),
  //     DataTable(app),
  //     Form(app),
  //     TransferTree(app),
  //     BaseComponent(),
  //     CRUD(app),
  //     CRUDDetail(app),
  //     Coming(),
  //     ScreenLock(),
  //     Gallery(),
  //     Result(),
  //     Page403(),
  //     Page500(),
  //     Print(),
  //     Banner(app),
  //     LevelRoute(app),
  //     NotFound()
  //   ]
  // }
];

export default app => createRoutes(app, routesConfig);
