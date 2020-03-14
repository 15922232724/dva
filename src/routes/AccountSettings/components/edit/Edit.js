import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Card, PageHeader } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Form from 'components/Form';
import PageLoading from 'components/Loading/PageLoading';
import './Edit.less';
import * as action from '../../action/Action'
const { Content, Header } = Layout;

const pathBase = 'accountsetting';
const namespace = 'accountsetting';
const nameTitle = '账号设置';
const idKey = 'id';

/**
 * 编辑
 */
@connect(({ accountsetting, loading }) => ({
  accountsetting,
  loading: loading.effects[`${action.NAME_SPACE}/get`],
  saveLoading: loading.effects[`${action.NAME_SPACE}/save`]
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
    const { dispatch, history: { location: { state } } } = this.props;
    // 获取路由中的用户id，并请求次用户数据
    dispatch(action.init())
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(action.clear());
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
      title: '邮箱',
      name: 'email',
      formItem: {
        disabled: true,
        col: { span: 12 },
      }
    },
    {
      title: '手机',
      name: 'phone',
      formItem: {
        disabled: true,
        col: { span: 12 },
      }
    }
  ];
  /**
   * 更新
   */
  handlerUpdate(value) {
    const { dispatch, history } = this.props;
    dispatch(action.update({
      value,
      success: () => {
        // this.setState({
        //   record: null,
        // });
      }
    }));
  }

  render() {
    const columns = this.createColumns(this);
    const { loading, saveLoading, history} = this.props;
    const { data }  = this.props[namespace];
    let { record } = this.state;
    const title = nameTitle;

    /**
     * 新增、修改都会进到这个方法中，
     * 可以使用主键或是否有record来区分状态
     */
    const onSubmit = () => {
      this.refs.form.validateFields((error, value) => {
        if (error) {
          console.warn(error);
          return;
        }
        value = {
          ...value,
          parent:value.parent || {code:value.parent}
        }
        this.handlerUpdate(value)
      });
    }
    /**
     * 头部组件
     */
    const headerTools = (
      <div>
        <PageHeader
          ghost={false}
          title={title}
          onBack={() => history.goBack()}
          extra={[
            <Button key="1" type="primary" loading={saveLoading} onClick={onSubmit}>提交</Button>
          ]}
        >
        </PageHeader>
      </div>
    )
    const formProps = {
      ref: 'form',
      columns,
      onSubmit,
      record: data,
      footer: false,
      formItemLayout: {
        // labelCol: { span: 4 },
        wrapperCol: { span: 24 }
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
