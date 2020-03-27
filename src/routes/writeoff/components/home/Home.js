import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Layout, Button, Icon, Input, Checkbox, Spin } from 'antd';
import DataTable, { Editable } from 'components/DataTable';
import SearchBar from 'components/SearchBar';

import { tableConfig } from './config'

@connect(({ manage, loading, global }) => ({
  manage,
  loading: loading.models.login,
}))
class Login extends Component {
  constructor (props) {
    super(props)
    // props.dispatch({
    //   type: 'global/activeInfoInit'
    // });

  }
  onSearch (info, rest) {
    console.log(info, rest)

  }

  render () {

    const config = tableConfig()

    const dataTableProps = {
      columns: config,
      rowKey: 'id',
      dataItems: [],
      selectType: 'checkbox',
      onSelect: (rows) => this.setState({ rows }),
      onChange: ({ pageNum, pageSize }) => {
        console.log(pageNum, pageSize)
      },
    }
    return (
      <div>
        <SearchBar
          columns={tableConfig()}
          type="grid"
          style={{ position: "absolute", right: '10px', top: '10px' }}
          onSearch={this.onSearch}
        />
        <DataTable pagination {...dataTableProps} />

      </div>
    );
  }
}

export default Login;
