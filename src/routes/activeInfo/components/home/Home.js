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

@connect(({ }) => ({
}))
class Active extends BaseComponent {
  state = {

  };
  constructor (props) {
    super(props);
  }
  onSubmit (values) {
    console.log(values)
  }
  componentDidMount () {
    const { dispatch } = this.props;
  }

  render () {

    return (
      <Layout className="full-layout home-page" >
        <div style={{ marginTop: '50px' }}>
          <Form type="grid" columns={columns} onSubmit={this.onSubmit} >

          </Form>
        </div>
      </Layout>
    );
  }
}
export default Active
