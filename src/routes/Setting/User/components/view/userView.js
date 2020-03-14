import React from 'react';
import { connect } from 'dva';
import { Layout, Card, PageHeader } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Form from 'components/Form';
import PageLoading from 'components/Loading/PageLoading';
import _ from 'lodash'
import './userView.less';
import * as actions from '../../action/userAction'
const { Content, Header } = Layout;
/**
 * 用户编辑
 */
@connect(({ user, loading }) => ({
  user,
  loading: loading.effects[`${actions.NAME_SPACE}/getUser`],
}))
export default class extends BaseComponent {
  state = {
    /**
     * 记录
     */
    record: null
  };
  componentDidMount() {
    // 获取路由中状态
    const { dispatch, match:{params}} = this.props;


    // 获取路由中的用户id，并请求次用户数据
    if (params) {
      const id = params.id;
      this.setState({
        record: { id },
      });
      dispatch(actions.getUser({ id }))
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actions.clearUser());
  }
  createColumns = (self) => [
    {
      title: '名称',
      name: 'firstName',
      formItem: {
        col: { span: 12 },
        rules: [{
          required: true,
          message: '请输入名称'
        }],   // 表单验证规则
      }
    },
    {
      title: '登录名',
      name: 'login',
      formItem: {
        col: { span: 12 },
        rules: [{
          required: true,
          message: '请输入登录名'
        }],   // 表单验证规则
      }
    },
    {
      title: '邮箱',
      name: 'email',
      formItem: {
        col: { span: 12 },
      }
    },
    {
      title: '手机',
      name: 'phone',
      formItem: {
        col: { span: 12 },
      }
    },
    {
      title: '角色',
      name: 'roleNames',
      formItem: {
        col: { span: 12 },
      }
    },
    {
      title: '所属组织',
      name: 'organizationName',
      formItem: {
        col: { span: 12 },
      }
    }
  ];

  render() {
    const columns = this.createColumns(this);
    const { loading, history, user: { userData } } = this.props;
    const title = '用户查看';

    /**
     * 头部组件
     */
    const headerTools = (
      <div>
        <PageHeader
          ghost={false}
          title={title}
          onBack={() => history.goBack()}
        >
        </PageHeader>
      </div>
    )
    const formProps = {
      ref: 'form',
      columns,
      preview: true,
      record: userData,
      footer: false,
      formItemLayout: {
      },
    };
    /**
     * 渲染
     */
    return (
      <Layout className="full-layout user-list-edit">
        <Header className="header">
          {headerTools}
        </Header>
        <Content className="content">
          <PageLoading loading={loading}>
            <Card title="基本信息" className="card" >
              <Form {...formProps} />
            </Card>
          </PageLoading>
        </Content>
      </Layout>
    );
  }
}
