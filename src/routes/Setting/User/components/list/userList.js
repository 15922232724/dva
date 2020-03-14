import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Button,PageHeader,Col,Tree } from 'antd';
import Icon from 'components/Icon';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import SideLayout from 'components/SideLayout';
import DataTable from 'components/DataTable';
import * as actions from '../../action/userAction'
import * as organizationAction from '../../../Organization/actions/organizationAction'

const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;
const TreeNode = Tree.TreeNode;

/**
 * 用户列表
 */
@connect(({ user, organization,loading }) => ({
  user,
  organization,
  loading: loading.effects[`${actions.NAME_SPACE}/getList`]
}))
export default class extends BaseComponent {
  state = {
    /**
     * 选中的行
     */
    rows: [],
    selectOrganization:''
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.initList())
    dispatch(organizationAction.initList())
    
  }
  /**
   * 列
   */
  createColumns = (self) => [
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
        render: (text, record) => {
          return (
            <DataTable.Oper>
              <Button tooltip="查看">
                <Link to={{pathname:`/user/view/${record.id}`}}>
                  <Icon type="eye" antd />
                </Link>
              </Button>
              <Button tooltip="修改">
                <Link to={{pathname:'/user/edit',state:{id:record.id}}}>
                  <Icon type="edit" />
                </Link>
              </Button>
              <Button tooltip="删除" onClick={e => self.onDelete(record)}>
                <Icon type="trash" />
              </Button>
            </DataTable.Oper>
          )
        }
      }
    }
  ];
  /**
   * 删除处理
   */
  handleDelete = records => {
    const { rows } = this.state;
    this.props.dispatch(actions.removeUser({
      records,
      success: () => {
        // 如果操作成功，在已选择的行中，排除删除的行
        this.setState({
          rows: rows.filter(
            item => !records.some(jtem => jtem.id === item.id)
          )
        });
      }
    }));
  };
  /**
   * 搜索处理
   */
  handleSearch = (values) => {
    const { user: { pageData }, dispatch } = this.props;
    const {selectOrganization} = this.state;
    if(selectOrganization !== ''){
      values = {...values,organization:selectOrganization}
    }

    dispatch(actions.getList({
      pageData: pageData.filter(values).jumpPage(1, 10)
    }));
  }
  /**
   * 分页改变处理
   */
  handleChange = ({ pageNum, pageSize }) => {
    const { user: { pageData }, dispatch } = this.props;
    dispatch(actions.getList({
      pageData: pageData.jumpPage(pageNum, pageSize)
    }));
  }
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };
  onSelectTreeNode = (selectedKeys, info) => {
    const { user: { pageData }, dispatch } = this.props;
    let value ;
    if(selectedKeys.length !== 0){
      value = {organization:selectedKeys[0]};
      this.setState({selectOrganization:selectedKeys[0]})
    }else{
      value = {organization:''};
      this.setState({selectOrganization:''})
    }
    dispatch(actions.getList({
      pageData: pageData.filter(value).jumpPage(1, 10)
    }));
  }
  render() {
    const { user: { pageData }, organization:{allData},loading, history } = this.props;
    const { rows } = this.state;
    const columns = this.createColumns(this);
    /**
     * 搜索参数
     */
    const searchBarProps = {
      columns,
      onSearch: this.handleSearch
    };
    /**
     * 头部工具栏
     */
    const PageToolbar = (
      <PageHeader
          ghost={false}
          title={'用户列表'}
          // onBack={() => history.goBack()}
          extra={[
            // onClick={onSubmit}
            <Button.Group>
              <Button type="primary" icon="plus" onClick={() => history.push('/user/edit')}>
                新增
              </Button>
              <Button
                disabled={!rows.length}
                onClick={e => this.onDelete(rows)}
                icon="delete"
              >
              删除
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
     * List渲染参数
     */
    const dataTableProps = {
      loading,
      columns,
      rowKey: 'id',
      dataItems: pageData,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: this.handleChange,
      onSelect: (keys, rows) => this.setState({ rows })
    };
    /**
     * 渲染
     */
    return (
      <Layout className="full-layout user-list-page">
        <Header>
          {PageToolbar}
        </Header>
        <Content >
        <SideLayout
          title="组织机构"
          sideContent={
            <Tree onSelect={this.onSelectTreeNode}>
              {this.renderTreeNodes(allData)}
            </Tree>
          }
          >
          <DataTable {...dataTableProps} style ={{height:'calc(100vh - 208px)'}} />
          </SideLayout>
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
      </Layout>
    );
  }
}
