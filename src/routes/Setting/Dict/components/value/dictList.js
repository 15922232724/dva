import React from 'react';
import { connect } from 'dva';
import { Layout, Button,PageHeader } from 'antd';
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
 * 字典值列表
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
    rows: [],
    record:{},
  };

  componentDidMount() {
    // 获取路由中状态
    const { dispatch, match:{params} } = this.props;
    // 获取路由中的用户id，并请求次用户数据
    if (params) {
      const id = params.id;
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
  createColumns(self){
    const { record,dict } = this.props;
    return [
      {
          title: '值编码',
          name: 'code',
          tableItem: {}
        },
        {
          title: '字典值名称',
          name: 'name',
          tableItem: {},
        },
        {
          title: '字典类型',
          name: 'type',
          tableItem: {},
        },
        {
          title: '操作',
          tableItem: {
            width: 180,
            render: (text, record) => (
              <DataTable.Oper>
                <Button tooltip="修改">
                  <Link to={{pathname:`/dict/editvalue`,state:{id:record.id,dictTypeId:dict.dict.code}}}>
                    <Icon type="edit" />
                  </Link>
                </Button>
                <Button tooltip="删除" onClick={e => self.onDelete({id:record.id})}>
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
    const { dispatch } = this.props;
    const { record:{id} } = this.state;
    this.props.dispatch(actions.removeDictValue({
      records,
      success: () => {
        dispatch(actions.getDict({ id }))
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
    const columns = this.createColumns(this);
    const { rows,record, } = this.state;
    /**
     * 头部工具栏
     */
    const PageToolbar = (
          // <Toolbar
          //   appendLeft={
          //     <Button.Group>
          //     <Button type="primary" icon="plus" onClick={() => history.push('/dict/edit')}>
          //         新增{record.name}字典数据
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
          title={'字典值'}
          subTitle={dict.dict && dict.dict.name}
          onBack={() => history.goBack()}
          extra={[
            // onClick={onSubmit}
            <Button key="1" type="primary" onClick={() => history.push({pathname:'/dict/editvalue',state:{dictTypeId:dict.dict.code}})} >添加字典值</Button>
          ]}
        >
          {/* <SearchBar group="abc" {...searchBarProps} /> */}
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
      dataItems: {list:dict.dict && dict.dict.dict && dict.dict.dict.map(item=>{return {...item,type:dict.dict.name}}) },
      showNum: true,
      isScroll: true,
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
