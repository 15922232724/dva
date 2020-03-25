import React from 'react';
import { connect } from 'dva';
import { Layout, Button, PageHeader, Checkbox, Input } from 'antd';
import BaseComponent from 'components/BaseComponent';
import cx from 'classnames';
import Icon from 'components/Icon';
import DataTable from 'components/DataTable';
import { Link } from 'dva/router';
import Form from 'components/Form';

import * as action from '../../action/Action'


import './Home.less';
import _ from 'lodash';
import { columns } from './config'
const FormItem = Form.Item

@connect(({
  global
}) => ({
  activeInfo: global.activeInfo

}))
class Active extends BaseComponent {
  state = {

  };
  constructor (props) {
    super(props);
  }
  onSubmit = (values) => {
    const { dispatch } = this.props;
    console.log(values, 999)
    dispatch({
      type: 'global/activeInfoUpdate',
      payload: values
    }
    )
  }
  timeChange = (value) => {
    console.log(value, 999)
  }
  componentDidMount () {
    const { dispatch } = this.props;
  }
  render () {
    const { activeInfo } = this.props
    const column = columns(this)

    console.log(activeInfo)
    const record = {
      state: 1
    }
    return (
      <Layout className="full-layout home-page" >
        <div style={{ marginTop: '50px' }}>
          <Form type="grid" columns={column} onSubmit={this.onSubmit} record={record}>
          </Form>
        </div>
      </Layout>
    );
  }
}
export default Active
