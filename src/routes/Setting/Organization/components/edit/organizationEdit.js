import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Card, PageHeader } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Form from 'components/Form';
import PageLoading from 'components/Loading/PageLoading';
import './organizationEdit.less';
import * as actions from '../../actions/organizationAction'
const { Content, Header } = Layout;
/**
 * 组织编辑
 */
@connect(({ organization, loading }) => ({
  organization,
  loading: loading.effects[`${actions.NAME_SPACE}/getOrganization`],
  saveLoading: loading.effects[`${actions.NAME_SPACE}/saveOrganization`]
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
      if(id){
        this.setState({
          record: { id },
        });
        dispatch(actions.getOrganization({ id }))
      }
    const parentOrganization = state.parentOrganization;
     if(parentOrganization){
      this.setState({
        record: { parentOrganization },
      });
     }
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actions.clearOrganization());
  }
  createColumns = (self) => {
    const { organization: { allData } } = this.props;
    let { record } = this.state;

    return [
      {
        title: '组织名称',
        name: 'name',
        formItem: {
          col: { span: 12 },
          rules: [{
            required: true,
            message: '请输入组织名称'
          }],   // 表单验证规则
        }
      },
      {
        title: '组织全称',
        name: 'fullName',
        formItem: {
          col: { span: 12 },
          rules: [{
            required: true,
            message: '请输入组织全称'
          }],   // 表单验证规则
        }
      },
      {
        title: '组织代号',
        name: 'code',
        formItem: {
          disabled:record,
          col: { span: 12 },
          rules: [{
            required: true,
            message: '请输入组织代号'
          }],   // 表单验证规则
        }
      },
      {
        title: '组织类型',
        name: 'type',
        dicttypecode:'ORGANIZATION_TYPE',
        formItem: {
          type: 'select',
          col: { span: 12 },
        }
      },
      {
        title: '上级组织',
        name: 'parentOrganization',
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
    dispatch(actions.saveOrganization({
      value:{...value,parentOrganization:{id:value.parentOrganization}},
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
    dispatch(actions.updateOrganization({
      value:{...value,parentOrganization:{id:value.parentOrganization}},
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
    let { loading, saveLoading, history, organization: { organizationData } } = this.props;
    if(this.state.record && this.state.record.parentOrganization){
      organizationData = {
        parentOrganization:this.state.record.parentOrganization
      }
    }else{
      organizationData = organizationData && {
        ...organizationData,
        parentOrganization: organizationData.parentOrganization && organizationData.parentOrganization.id
    }
    }
  
    let { record } = this.state;
    const title = (record ? '组织编辑' : '组织新增');

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
        if (record && record.id) {
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
      record: organizationData,
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
