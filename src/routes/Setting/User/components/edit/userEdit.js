import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Card, PageHeader } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Form from 'components/Form';
import PageLoading from 'components/Loading/PageLoading';
import './userEdit.less';
import * as actions from '../../action/userAction'
const { Content, Header } = Layout;
/**
 * 用户编辑
 */
@connect(({ user,organization, loading }) => ({
  user,
  organization,
  loading: loading.effects[`${actions.NAME_SPACE}/getUser`],
  saveLoading: loading.effects[`${actions.NAME_SPACE}/saveUser`]
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
    if (state) {
      const id = state.id;
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
  createColumns = (self) => {
    const { organization: { allData } } = this.props;

    return [
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
        title: '用户类型',
        name: 'userType',
        dict: [
          { code: 'NORMAL', name: '普通用户' },
          { code: 'ADMIN', name: '管理员' },
        ],
        formItem: {
          col: { span: 12 },
          disabled: this.state.record,
          type: 'select',
          rules: [{
            required: true,
            message: '用户类型必须选择'
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
        title: '所属组织',
        name: 'organization',
        formItem: {
          type: 'treeSelect',
          treeData: this.mapTree(allData),
          col: { span: 12 },
        }
      },
    ]
  };
  /**
   * 改变组织结构
   * @param {} nodes 
   */
  mapTree(nodes){
    return nodes.map((node)=>{
      let children = null
      if(node.children){
        children = this.mapTree(node.children)
      }
      return {
        title:node.name,
        value:node.id,
        children:children,
      }
    })
  }
  /**
   * 保存
   */
  handlerSave(value) {
    const { dispatch, history } = this.props;
    dispatch(actions.saveUser({
      value,
      success: () => {
        this.setState({
          record: null
        });
        history.goBack()
      }
    }));
  }
  /**
   * 更新
   */
  handlerUpdate(value) {
    const { dispatch, history } = this.props;
    dispatch(actions.updateUser({
      value,
      success: () => {
        this.setState({
          record: null,
        });
        history.goBack()
      }
    }));
  }

  render() {
    const columns = this.createColumns(this);
    const { loading, saveLoading, history, user: { userData } } = this.props;
    let { record } = this.state;
    const title = (record ? '用户编辑' : '用户新增');

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
        if (record) {
          this.handlerUpdate({
            id: record.id,
            ...value
          })
        } else {
          this.handlerSave(value)
        }
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
      record: userData,
      footer: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 }
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
