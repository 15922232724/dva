import React from 'react';
import { connect } from 'dva';
import { Layout, Button,PageHeader } from 'antd';
import BaseComponent from 'components/BaseComponent';
// import Toolbar from 'components/Toolbar';
// import SearchBar from 'components/SearchBar';
import Icon from 'components/Icon';
import DataTable from 'components/DataTable';
import { Link } from 'dva/router';

import * as action from '../../action/Action'

import './List.less';
import _ from 'lodash';

const { Content, Header, Footer } = Layout;
// const Pagination = DataTable.Pagination;

const pathBase = 'parameter';
const namespace = 'parameter';
const nameTitle = '系统参数';
const idKey = 'code';

/**
 * 角色列表
 */
@connect(({ parameter, loading }) => ({
  parameter,
  loading: loading.effects[`${namespace}/getList`],
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
    dispatch(action.initList())
  }
  /**
   * 列
   */
  createColumns(self){    
    return [
      {
        title: '参数名称',
        name: 'name',
        tableItem: {},
      },
      {
          title: '参数编码',
          name: 'code',
          tableItem: {}
        },
      {
          title: '参数值',
          name: 'value',
          tableItem: {}
        },
        {
          title: '操作',
          tableItem: {
            width: 180,
            render: (text, record) => (
              <DataTable.Oper>
                <Button tooltip="修改">
                  <Link to={{pathname:`/${pathBase}/edit`,state:{id:record[idKey]}}}>
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
      ]
  }
  
  /**
   * 删除处理
   */
  handleDelete = records => {
    const { rows } = this.state;

    this.props.dispatch(action.remove({
      records,
      success: () => {
        // 如果操作成功，在已选择的行中，排除删除的行
        this.setState({
          rows: rows.filter(
            item => !records.some(jtem => jtem.rowKey === item.rowKey)
          )
        });
      }
    }));
  };
  /**
   * 搜索处理
   */
  handleSearch = (values) => {
    const { dispatch } = this.props;
    const model = this.props[namespace];
    const list = model.list;
    dispatch(action.getList({
      pageData: list.filter(values).jumpPage(1, 10)
    }));
  }
  /**
   * 分页改变处理
   */
  handleChange = ({ pageNum, pageSize }) => {
    const { dispatch } = this.props;
    const model = this.props[namespace];
    const list = model.list;

    dispatch(action.getList({
      pageData: list.jumpPage(pageNum, pageSize)
    }));
  }

  render() {
    const { loading, history} = this.props;
    const model = this.props[namespace];
    const list = model.list;
    const columns = this.createColumns(this);
    const { rows } = this.state;
    /**
     * 头部工具栏
     */
    const PageToolbar = (
          <PageHeader
          ghost={false}
          title={`${nameTitle}列表`}
          // onBack={() => history.goBack()}
          extra={[
            // onClick={onSubmit}
            <Button.Group key='topbuttons'>
              <Button type="primary" icon="plus" onClick={() => history.push(`/${pathBase}/edit`)}>
                新增
              </Button>
            </Button.Group>
          ]}
        >
          {/* <Col>
                    <SearchBar group="abc"  {...searchBarProps} />
          </Col> */}
        </PageHeader>
    )
    // const searchBarProps = {
    //   columns,
    //   onSearch: this.handleSearch,
    // };
    /**
     * List渲染参数
     */
    const dataTableProps = {
      loading:loading,
      columns,
      rowKey: 'code',
      dataItems: {list},
      bordered:true,
      // selectType: 'checkbox',
      // showNum: true,
      isScroll: true,
      // selectedRowKeys: rows.map(item => item.rowKey),
      // onChange: this.handleChange,
      // onSelect: (keys, rows) => this.setState({ rows })
    };

    return (
      <Layout className="full-layout user-page">
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
