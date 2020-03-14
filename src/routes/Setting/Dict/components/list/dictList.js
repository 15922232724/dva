import React from 'react';
import { connect } from 'dva';
import { Layout, Button,PageHeader,Col } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
// import SearchBar from 'components/SearchBar';
import Icon from 'components/Icon';
import DataTable from 'components/DataTable';
import { Link } from 'dva/router';
import * as actions from '../../action/dictAction'

import './dictList.less';
import _ from 'lodash';

const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;
/**
 * 字典列表
 */
@connect(({ dict, loading }) => ({
  dict,
  loading: loading.effects['dict/getDict'],
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
    dispatch(actions.initDictList())
  }
  /**
   * 列
   */
  createColumns(self){
    return [
      {
          title: '编码',
          name: 'code',
          tableItem: {}
        },
        {
          title: '字典名称',
          name: 'name',
          tableItem: {},
        },
        {
          title: '备注',
          name: 'note',
          tableItem: {},
          formItem: {
          }
        },
        {
          title: '操作',
          tableItem: {
            width: 180,
            render: (text, record) => (
              <DataTable.Oper>
                {/* <Button tooltip="查看">
                  <Link to={{pathname:'/dict/view',state:{id:record.code}}}>
                    <Icon type="eye" antd/>
                  </Link>
                </Button> */}
                <Button tooltip="修改">
                  <Link to={{pathname:'/dict/edit',state:{id:record.code}}}>
                    <Icon type="edit" />
                  </Link>
                </Button>
                <Button tooltip="字典值" >
                  <Link to={{pathname:`/dict/value/${record.code}`}}>
                  <Icon type="apartment" antd/>
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

    this.props.dispatch(actions.removeDict({
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
    const { dict: { dictListFilter }, dispatch } = this.props;
    dispatch(actions.getDictList({
      pageData: dictListFilter.filter(values)
    }));
  }
  /**
   * 分页改变处理
   */
  // handleChange = ({ pageNum, pageSize }) => {
  //   const { role: { roleList }, dispatch } = this.props;
  //   dispatch(actions.getRoleList({
  //     pageData: roleList.jumpPage(pageNum, pageSize)
  //   }));
  // }

  render() {
    const { dict, loading, history} = this.props;
    const { dictList } = dict;
    const columns = this.createColumns(this);
    const { rows } = this.state;
    /**
     * 头部工具栏
     */
    const PageToolbar = (
          // <Toolbar
          //   appendLeft={
          //     <Button.Group>
          //     <Button type="primary" icon="plus" onClick={() => history.push('/dict/edit')}>
          //         新增字典
          //       </Button>
          //       <Button
          //         disabled={!rows.length}
          //         onClick={e => this.onDelete(rows)}
          //         icon="delete"
          //       >
          //         删除
          //       </Button>
          //     </Button.Group>
          //   }
          // >
          //   {/* <SearchBar group="abc" {...searchBarProps} /> */}
          // </Toolbar>
            <PageHeader
            ghost={false}
            title={'字典列表'}
            // onBack={() => history.goBack()}
            extra={[
              // onClick={onSubmit}
              <Button.Group key='topbutton'>
                <Button key='add' type="primary" icon="plus" onClick={() => history.push('/dict/edit')}>
                  新增字典
                </Button>
                <Button
                  key='remove'
                  disabled={!rows.length}
                  onClick={e => this.onDelete(rows)}
                  icon="delete"
                >
                删除
                  </Button>
              </Button.Group>
            ]}
          >
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
      dataItems: {list:dictList },
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      // onChange: this.handleChange,
      onSelect: (keys, rows) => this.setState({ rows })
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
