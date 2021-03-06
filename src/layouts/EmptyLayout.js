import './styles/user.less';
import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Switch } from 'dva/router';
const { Content } = Layout;

@connect()
export default class EmptyLayout extends React.PureComponent {
  render() {
    const {routerData} = this.props;
    const {childRoutes} = routerData;

    return (
      // <Layout className="fixed">
      //   <Content>
          <Switch>{childRoutes}</Switch> 
      //   </Content>
      // </Layout>
    );
  }
}