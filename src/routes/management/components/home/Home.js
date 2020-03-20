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
import { Button } from 'antd';
import { ModalForm } from 'components/Modal';
const Pagination = DataTable.Pagination;



@connect(({ manage, loading, global }) => ({
  manage: manage.data,
  loading: loading.models.login,
}))
class Login extends BaseComponent {
  constructor (props) {
    super(props)
    this.state = {
      rows: [],
      type: null,
      visible: false
    };
    props.dispatch({
      type: 'manage/getTableList'
    });
  }

  handleAdd () {
    /* 子类重写 */
  }
  handleUpdate (records) {
    if (records) {
      this.setState({
        record: records,
        visible: true
      });
    } else {
      this.setState({
        record: null,
        visible: true
      });
    }
  }
  handleDelete (records) {
    console.log(records, 999)
  }
  onSearch (info, rest) {
    console.log(info, rest)

  }
  onExport () {
    console.log(this.state.rows)
  }
  render () {

    const { loading, manage, dispatch } = this.props
    const column = tableConfig(this)
    console.log(searchConfig)
    const { record, visible } = this.state;


    const dataTableProps = {
      columns: column,
      rowKey: 'id',
      dataItems: manage,
      showNum: true,
      selectType: 'checkbox',
      onSelect: (rows) => this.setState({ rows })
    }
    const modalFormProps = {
      loading,
      record,
      visible,
      columns: column,
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        });
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: values => {
        if (record) {
          dispatch({
            type: 'manage/updateInfo',
            payload: {
              values,
              success: () => {
                this.setState({
                  record: null,
                  visible: false
                });
              }
            }
          });
        } else {
          dispatch({
            type: 'manage/addInfo',
            payload: {
              values,
              success: () => {
                this.setState({
                  record: null,
                  visible: false
                });
              }
            }
          });
        }
      }
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
        <Button.Group style={{ position: 'absolute', right: '200px', top: '110px' }}>
          <Button type="primary" icon="plus"
            onClick={e => this.handleUpdate()}
            style={{ marginRight: '10px' }}

          >
            新增
                </Button >
          <Button
            onClick={e => this.onExport()}
            icon="delete"
          >
            导出
                </Button>
        </Button.Group>
        <DataTable pagination {...dataTableProps} />
        <ModalForm {...modalFormProps} />

      </div >
    );
  }
}

export default Login;
