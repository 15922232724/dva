import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Row, Col, Tree } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import SideLayout from 'components/SideLayout';
import DataTable, { Editable } from 'components/DataTable';
import { tableConfig, searchConfig } from './config'
import SearchBar from 'components/SearchBar';


const Pagination = DataTable.Pagination;

@connect(({ manage, loading, global }) => ({
  manage: manage.data,
  loading: loading.models.login,
}))
class Login extends BaseComponent {
  constructor (props) {
    super(props)
    console.log(props)
    props.dispatch({
      type: 'manage/getTableList'
    });
  }
  handleAdd () {
    /* 子类重写 */
  }
  handleUpdate (records) {
    console.log(records)
  }
  handleDelete (records) {
    console.log(records)
  }
  onSearch (info, rest) {
    console.log(info, rest)

  }
  render () {
    const { loading, manage } = this.props
    const column = tableConfig(this)
    console.log(searchConfig)
    const dataTableProps = {
      columns: column,
      rowKey: 'id',
      dataItems: manage,
      showNum: true,
      selectType: 'checkbox',

    };
    return (
      <div>
        <SearchBar
          columns={searchConfig()}
          type="grid"
          cols={{ span: 6 }}
          style={{ position: "absolute", right: '10px', top: '110px' }}
          onSearch={this.onSearch}
        />
        <DataTable pagination {...dataTableProps} />

      </div>
    );
  }
}

export default Login;
