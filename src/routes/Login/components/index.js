import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Layout, Button, Icon, Input, Checkbox, Spin } from 'antd';
import './index.less';
const { Content, Header } = Layout;
const FormItem = Form.Item;

@connect(({ login, loading, global }) => ({
  login,
  loading: loading.models.login,
  activeInfo: global.activeInfo
}))
class Login extends Component {
  handleSubmit = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: values
        });
      }
    });
  };

  render () {
    const { loading, form, activeInfo } = this.props;
    const { getFieldDecorator } = form;


    return (
      <Layout className="full-layout login-page">
        <Header>
          <div>
            <img src={activeInfo.headerImg} className="headerImg" />
            <div className='activeInfo'>
              <div className="info">
                <p>{activeInfo.name}</p>
                <p>{activeInfo.startTime}</p>
                <p>{activeInfo.endTime}</p>
                <p>中国.{activeInfo.place}</p>
              </div>


            </div>
            <div>
            </div>
          </div>
        </Header>
        <Content>
          <Spin tip="登录中..." spinning={!!loading}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="user-img">
                <b>东北安防博览会后台管理系统</b>
                <span></span>
              </div>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入您的用户名!' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" />}
                    placeholder="用户名"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入您的密码!' }]
                })
                  (
                    <Input
                      size="large"
                      prefix={<Icon type="lock" />}
                      type="password"
                      placeholder="密码"
                    />
                  )}
              </FormItem>
              <FormItem>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>

              </FormItem>
            </Form>
          </Spin>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);
