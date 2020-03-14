import React from 'react';
import { Upload,Icon, message } from 'antd';
import $$ from 'cmn-utils';
import config from '@/config';
// 从全局配置里获取参数
const request = config.request || {};
const { Dragger } = Upload;

/**
 * 使Upload可以走全局代理，并可携带全局头部信息
 */
export default class extends React.PureComponent {
  render() {
    const { headers, action,dragger, ...otherProps } = this.props;

    let newheaders = { ...headers };

    const uploadProps = { ...otherProps };

    if (request && request.withHeaders) {
      if ($$.isFunction(request.withHeaders)) {
        newheaders = { ...request.withHeaders(), ...newheaders };
      } else if ($$.isObject(request.withHeaders)) {
        newheaders = { ...request.withHeaders, ...newheaders };
      }
      uploadProps.headers = newheaders;
    }

    let nextURL = (request.prefix || '') + action;
    if (/^(http|https|ftp):\/\//.test(action)) {
      nextURL = action;
    }

    if (action) {
      uploadProps.action = nextURL;
    }
    const btn = (<Upload {...uploadProps} />)
    const dra = (
      <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <Icon type="inbox" />
      </p>
      <p className="ant-upload-text">点击或拖拽至此上传文件</p>
      <p className="ant-upload-hint">
        支持批量上传
      </p>
    </Dragger>
    );
    return dragger?dra:btn;
  }
}
