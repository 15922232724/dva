import React from 'react';
import { connect } from 'dva';
import { Layout, Button, PageHeader, Checkbox,Input } from 'antd';
import BaseComponent from 'components/BaseComponent';
import cx from 'classnames';
import Icon from 'components/Icon';
import DataTable from 'components/DataTable';
import { Link } from 'dva/router';

import * as action from '../../action/Action'

import './Home.less';
import _ from 'lodash';

const { Content, Header, Footer } = Layout;
// const Pagination = DataTable.Pagination;

const pathBase = 'area';
const namespace = 'area';
const nameTitle = '系统参数';
const idKey = 'code';
const MAX_HIGHT = 400;
const DEFAULT_FROM_FONT_SIZE = 26;
/**
 * 角色列表
 */
@connect(({ area, loading }) => ({
  area,
  loading: loading.effects[`${namespace}/getList`],
}))
export default class extends BaseComponent {
  state = {

  };
  constructor(props){
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    const { loading, history } = this.props;
    const model = this.props[namespace];
 
    return (
      <Layout className="full-layout home-page">
          <h1>DEMO</h1>
      </Layout>
    );
  }
}
