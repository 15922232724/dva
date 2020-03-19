import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Layout, Button, Icon, Input, Checkbox, Spin } from 'antd';


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

  render () {


    return (
      <div>1</div>
    );
  }
}

export default Login;
