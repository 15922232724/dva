import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Card, PageHeader } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Form from 'components/Form';
import PageLoading from 'components/Loading/PageLoading';
import './Edit.less';
import * as action from '../../action/Action'
const { Content, Header } = Layout;

const pathBase = 'file-bucket';
const namespace = 'fileBucket';
const nameTitle = '对象存储空间';
const idKey = 'id';

/**
 * 编辑
 */
@connect(({ fileBucket, loading }) => ({
  fileBucket,
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
    if (state) {
      const id = state.id;
      this.setState({
        record: { id },
      });
      dispatch(action.get({ id }))
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(action.clear());
  }
  createColumns = (self) => [
    {
      title: '空间名称',
      name: 'name',
      formItem: {
        col: { span: 12 },
        rules: [{
          required: true,
          message: '请输入名称'
        }],   // 表单验证规则
      }
    },
    {
        title: '存储位置',
        name: 'storageLocation',
        dicttypecode:'STORAGE_LOCATION',
        formItem: {
          col: { span: 6 },
          type:'select',
          rules: [{
            required: true,
            message: '请选择存储位置'
          }],   // 表单验证规则
        }
    },
    {
        title: '访问控制',
        name: 'accessControl',
        dicttypecode:'ACCESS_CONTROL',
        formItem: {
          col: { span: 6 },
          type:'select',
          rules: [{
            required: true,
            message: '请选择访问控制'
          }],   // 表单验证规则
        }
      }, 
      {
        title: '三方存储空间名称',
        name: 'tripleBucket',
        formItem: {
          col: { span: 12 },
        }
      },
      {
        title: '三方存储空间AccessKeyId',
        name: 'tripleBucketAccessKeyId',
        formItem: {
          col: { span: 12 },
        }
      },
      {
        title: '三方存储空间AccessKey',
        name: 'tripleBucketAccessKey',
        formItem: {
          col: { span: 12 },
        }
      },
      {
        title: '三方存储空间SecretKey',
        name: 'tripleBucketSecretKey',
        formItem: {
          col: { span: 12 },
        }
      },
      {
        title: '三方存储空间地址',
        name: 'tripleBucketUrl',
        formItem: {
          col: { span: 12 },
        }
      },
      {
        title: '三方存储region',
        name: 'region',
        formItem: {
          col: { span: 12 },
        }
      },
      {
        title: '备注',
        name: 'note',
        formItem: {
          col: { span: 24 },
        }
      },
  ];
  /**
   * 保存
   */
  handlerSave(value) {
    const { dispatch, history } = this.props;
    dispatch(action.save({
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
    dispatch(action.update({
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
    const { loading, saveLoading, history} = this.props;
    const { data }  = this.props[namespace];
    let { record } = this.state;
    const title = (record ? `${nameTitle}编辑` : `${nameTitle}新增`);

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
      record: data,
      footer: false,
      formItemLayout: {
        // labelCol: { span: 6 },
        // wrapperCol: { span: 24 },
        labelCol:{span: 6},
        labelAlign:'left'
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
