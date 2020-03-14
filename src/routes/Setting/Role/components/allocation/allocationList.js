import React from 'react';

import { connect } from 'dva';
import { Layout, Button,PageHeader,Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import * as actions from '../../action/roleAction'
import AllocationModal from './allocationModal'
import './allocationList.less';
import _ from 'lodash';
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

/**
 * 角色用户列表
 */
@connect(({ role, loading }) => ({
  role,
  loading: loading.models.role,
}))
export default class extends BaseComponent {
  state = {
    record: null,
    visible: false,
    visibleAllocation: false,
    rows: []
  };
  componentDidMount() {
    const { dispatch, match:{params} } = this.props;
    // 获取路由中的用户id，并请求次用户数据
    if (params) {
      const id = params.id;
      this.setState({
        record: { id },
      });
      dispatch(actions.initRoleUserList({ id }))
    }
  }
  /**
   * 角色用户移除处理
   * @param {*} records 
   */
  handleDelete(records) {
    const { dispatch} = this.props;
    const {record:{id}} = this.state; 
    dispatch(actions.deleteRoleUserList({
      value:records.map(r=>`${r.id}`),
      id,
    }))
  }
  /**
   * 列
   */
  createColumns(self) {
    return [
      {
        title: '名称',
        name: 'firstName',
        tableItem: {},
        searchItem: {
          group: 'abc'
        }
      },
      {
        title: '登录名',
        name: 'login',
        tableItem: {},
        searchItem: {
          group: 'abc'
        }
      },
      {
        title: '邮箱',
        name: 'email',
        tableItem: {},
      },
      {
        title: '手机',
        name: 'phone',
        tableItem: {},
      },
      {
        title: '操作',
        tableItem: {
          width: 180,
          render: (text, record) => (
            <DataTable.Oper>
              <Button tooltip="删除" onClick={e => self.onDelete(record)}>
                <Icon type="trash" />
              </Button>
            </DataTable.Oper>
          )
        }
      }
      ]
  };
  render() {
    const { role, loading, dispatch,history} = this.props;
    const { roleUserList,allocationModalIsShow } = role;
    const columns = this.createColumns(this);
    const { rows, visible, record} = this.state;

    /**
     * 搜索参数
     */
    const searchBarProps = {
      columns,
      onSearch: values => {
        dispatch({
          type: 'role/getRoleUserList',
          payload: {
            pageData: roleUserList.filter(values).jumpPage(1, 10),
            id:record.id
          }
        });
      }
    };
    /**
     * 头部工具栏
     */
    const headerTools = (
          <PageHeader
          ghost={false}
          title={'角色分配'}
          // subTitle={record.name}
          onBack={() => history.goBack()}
          extra={[
            // onClick={onSubmit}
            <Button.Group>
              <Button type="primary" icon="plus" onClick={() => dispatch(actions.showAllocationModalIsShow())}>
              分配新用户
              </Button>
              <Button
                disabled={!rows.length}
                onClick={e => this.onDelete(rows)}
                icon="delete"
              >
              移除
                </Button>
            </Button.Group>
          ]}
        >
          <Col>
                    <SearchBar group="abc"  {...searchBarProps} />
          </Col>
        </PageHeader>
    )
    /**
     * 分配角色模态框
     */
    const allocationModalProps={
      visible:allocationModalIsShow,
      record:this.state.record,
      onCancel: () => {
        dispatch(actions.hidenallocationModalIsShow())
      },
    }
    /**
     * List渲染参数
     */
    const dataTableProps = {
      loading:loading,
      columns,
      rowKey: 'id',
      dataItems: roleUserList,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: ({ pageNum, pageSize }) => {
        dispatch({
          type: 'role/getRoleUserList',
          payload: {
            pageData: roleUserList.jumpPage(pageNum, pageSize),
            id:record.id,
          }
        });
      },
      onSelect: (keys, rows) => this.setState({ rows })
    };
    /**
     * 渲染
     */
    return (
      <Layout className="full-layout user-page">
        <Header>
          {headerTools}
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <AllocationModal {...allocationModalProps}/>
      </Layout>
    );
  }

}
