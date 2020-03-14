import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { Layout, Menu, Avatar, Icon } from 'antd';
import { Switch, routerRedux } from 'dva/router';
import NavBar from 'components/NavBar';
import { LeftSideBar, RightSideBar } from 'components/SideBar';
import TopBar from 'components/TopBar';
import SkinToolbox from 'components/SkinToolbox';
import pathToRegexp from 'path-to-regexp';
import { getThemeColor, changeAntdTheme } from 'dynamic-antd-theme';
import { enquireIsMobile } from '@/utils/enquireScreen';
import TabsLayout from './TabsLayout';
import './styles/basic.less';
import './styles/front.less';
import $$ from 'cmn-utils';
import cx from 'classnames';
import logoImg from 'assets/images/logo.png';
const { Content, Header, Footer } = Layout;

/**
 * 基本部局
 * 可设置多种皮肤 theme: [light, grey, primary, info, warning, danger, alert, system, success, dark]
 * 可设置多种布局 [header(固定头), sidebar(固定边栏), breadcrumb(固定面包蟹), tabLayout(标签布局)]
 * @author weiq
 */
@connect(({ global }) => ({ global }))
export default class BasicLayout extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      currentMenu: {},
      isMobile: false
    };
    // props.dispatch({
    //   type: 'global/init'
    // });
  }

  componentDidMount () {
    const color = 'gray';
    changeAntdTheme(
      getThemeColor(color)
    );
    this.unregisterEnquire = enquireIsMobile(ismobile => {
      const { isMobile, theme } = this.state;
      if (isMobile !== ismobile) {
        // 如查是移动端则不固定侧边栏
        // if (ismobile && $$.isArray(theme.layout)) {
        //   theme.layout = theme.layout.filter(item => item !== 'fixedSidebar');
        // }
        this.setState({
          isMobile: ismobile
        });
      }
    });
  }


  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.location.pathname !== this.props.location.pathname ||
  //     nextProps.global.flatMenu !== this.props.global.flatMenu
  //   ) {
  //     this.setState({
  //       currentMenu: this.getCurrentMenu(nextProps) || {}
  //     });
  //   }
  // }

  componentWillUnmount () {
    // 清理监听
    this.unregisterEnquire();
  }

  render () {
    const { routerData: { childRoutes } } = this.props;

    return (
      <Layout className="full-layout basic-layout front-layout">
        {/* <DynamicAntdTheme primaryColor='#4A4A4A'/> */}
        <Header className='top'>
          <img src='' />
        </Header>

        <Content >
          <div style={{ background: '#fff', minHeight: 280 }} className="router-page">
            <Switch>{childRoutes}</Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2019 Created by Dean</Footer>
      </Layout>
    );
  }
}
