import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Button,PageHeader,Col } from 'antd';
import Icon from 'components/Icon';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import * as actions from '../../actions/organizationAction'
import _ from 'lodash'
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;
/**
 * 用户列表
 */
@connect(({ organization, loading }) => ({
  organization,
  loading: loading.effects[`${actions.NAME_SPACE}/getList`]
}))
export default class extends BaseComponent {
  state = {
    /**
     * 选中的行
     */
    rows: []
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.initList())
  }
  /**
   * 列
   */
  createColumns = (self) => [
    {
      title: '组织名称',
      name: 'name',
      tableItem: {},
      searchItem: {
        group: 'abc'
      }
    },
    {
      title: '组织全称',
      name: 'fullName',
      tableItem: {},
    },
    {
      title: '组织代号',
      name: 'code',
      tableItem: {},
    },
    {
      title: '组织类型',
      name: 'type',
      dicttypecode:'ORGANIZATION_TYPE',
      tableItem: {},
    },
    {
      title: '操作',
      tableItem: {
        width: 180,
        render: (text, record) => {
          return (
            <DataTable.Oper>
              <Button tooltip="修改">
                <Link to={{pathname:'/organization/edit',state:{id:record.id}}}>
                  <Icon type="edit" />
                </Link>
              </Button>
              <Button tooltip="添加子组织">
                <Link to={{pathname:`/organization/edit`,state:{parentOrganization:record.id}}}>
                  <Icon type="apartment" antd />
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
    this.props.dispatch(actions.removeOrganization({
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
    const { organization: { pageData }, dispatch } = this.props;
    dispatch(actions.getList({
      pageData: pageData.filter(values).jumpPage(1, 10)
    }));
  }
  /**
   * 分页改变处理
   */
  handleChange = ({ pageNum, pageSize }) => {
    const { organization: { pageData }, dispatch } = this.props;
    dispatch(actions.getList({
      pageData: pageData.jumpPage(pageNum, pageSize)
    }));
  }

  render() {
    const { organization: { allData }, loading, history } = this.props;
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
      title={'组织列表'}
      extra={[
        // onClick={onSubmit}
        <Button.Group>
          <Button type="primary" icon="plus" onClick={() => history.push('/organization/edit')}>
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
      dataItems: {list:allData},
      selectType: 'checkbox',
      // showNum: true,
      bordered:true,
      expandRowByClick:true,
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
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          {/* <Pagination {...dataTableProps} /> */}
        </Footer>
      </Layout>
    );
  }
}
