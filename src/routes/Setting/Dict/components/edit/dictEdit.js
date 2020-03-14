import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Card, PageHeader } from 'antd';
import $$ from 'cmn-utils';
import {Net} from '@/utils/request'
import BaseComponent from 'components/BaseComponent';
import DataTable from 'components/DataTable';
import Form from 'components/Form';
import PageLoading from 'components/Loading/PageLoading';
import Icon from 'components/Icon';
import { Link } from 'dva/router';
import './dictEdit.less';
import * as actions from '../../action/dictAction'

const { Content, Header } = Layout;
/**
 * 字典编辑
 */
@connect(({ dict, loading }) => ({
  dict,
  loading: loading.effects[`${actions.NAME_SPACE}/getDict`],
  saveLoading: loading.effects[`${actions.NAME_SPACE}/saveDict`]
}))
export default class extends BaseComponent {
  state = {
    /**
     * 记录
     */
    record: null,
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
      dispatch(actions.getDict({ id }))
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actions.clearDict());
  }
  /**
   * 列
   */
  createColumns = (self) => {
    const { dict, loading } = self.props;
    let { record } = this.state;
    // let {authSelect} = role
    
    return [
      {
        title: '编码',
        name: 'code',
        formItem: {
          disabled:record,
          rules: [{
            required: true,
            message: '请输入编码'
          }],   // 表单验证规则
        }
      },
      {
        title: '字典名称',
        name: 'name',
        formItem: {
          rules: [{
            required: true,
            message: '请输入名称'
          }],   // 表单验证规则
        }
      },
      {
        title: '备注',
        name: 'note',
        formItem: {}
      },
      ]
  };
  
  /**
   * 保存
   */
  handlerSave(value) {
    const { dispatch, history } = this.props;
    dispatch(actions.saveDict({
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
    dispatch(actions.updateDict({
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
    const { loading, saveLoading, history, dict: { dict } } = this.props;
    let { record } = this.state;
    const title = (record ? '字典编辑' : '字典新增');

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
          value.authorities = (value.authorities || []).map(a=>{
            return { code:a.code}
          })
          this.handlerUpdate({
            id: record.id,
            ...value
          })
        } else {
          value.authorities = (value.authorities || []).map(a=>{
            return { code:a}
          })
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
    /**
     * 列表属性
     */
    const formProps = {
      ref: 'form',
      columns,
      onSubmit,
      record: dict,
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
