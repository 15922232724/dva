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
import './roleEdit.less';
import * as actions from '../../action/roleAction'

const { Content, Header } = Layout;
/**
 * 角色编辑
 */
@connect(({ role, loading }) => ({
  role,
  loading: loading.effects[`${actions.NAME_SPACE}/getRole`],
  saveLoading: loading.effects[`${actions.NAME_SPACE}/saveRole`]
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
      dispatch(actions.getRole({ id }))
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actions.clearRole());
  }
  /**
   * 列
   */
  createColumns = (self) => {
    const { role, loading } = self.props;
    let { record } = this.state;
    let {authSelect} = role
    const innerColumns = [
      {
        title: '名称',
        name: 'name',
        tableItem: {}
      },
      {
        title: '编码',
        name: 'code',
        tableItem: {}
      },
    ];
    
    return [
      {
          title: '编码',
          name: 'code',
          tableItem: {},

          formItem: {
            disabled:record,
            // col: { span: 12 },
            rules: [{
              required: true, 
              message: '请输入编码' 
            }],   // 表单验证规则
          }
        },
        {
          title: '角色名称',
          name: 'name',
          formItem: {
            // col: { span: 12 },
            rules: [{
              required: true, 
              message: '请输入名称' 
            }],   // 表单验证规则
      
          }
        },
        {
          title: '备注',
          name: 'note',
          formItem: {
          }
        },
        {
          title: '权限',
          name: 'authorities',
          formItem: {
            type: 'table',
            selectType: 'checkbox',
            modal: false,
            showNum:false,
            pagination:false,
            rowKey: 'code',
            columns: innerColumns,
            initialValue:authSelect,
            expandRowByClick:true,
            loadData: pageInfo => {
              return Net.get('/auths',)
                .then(resp => {
                  return  {
                    list:resp.filter(auth=>{
                      return _.size(auth.childrenAuthorities)!==0
                    })
                    .map(auth=>{
                        return {
                          ...auth,
                          children:auth.childrenAuthorities
                        }
                    })
                  };
                })
                .catch(e => console.error(e));
            },
            loading,
          }
        },    
        {
          title: '操作',
          tableItem: {
            width: 180,
            render: (text, record) => (
              <DataTable.Oper>
                <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
                  <Icon type="edit" />
                </Button>
                <Button tooltip="分配" >
                  <Link to={{pathname:'/role/allocation',state:{id:record.code}}}>
                  <Icon type="users" />
                  </Link>
                </Button>
                <Button tooltip="删除" onClick={e => self.onDelete(record)}>
                  <Icon type="trash" />
                </Button>
              </DataTable.Oper>
            )
          }
        }
      ]
  };
  
  /**
   * 保存
   */
  handlerSave(value) {
    const { dispatch, history } = this.props;
    dispatch(actions.saveRole({
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
    dispatch(actions.updateRole({
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
    const { loading, saveLoading, history, role: { role } } = this.props;
    let { record } = this.state;
    const title = (record ? '角色编辑' : '角色新增');

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
      record: role,
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
