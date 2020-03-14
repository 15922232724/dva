import React from 'react';
import moment from 'moment';
import { InputNumber, Button } from 'antd';
export const columns = [
  {
    title: '展会名称',
    name: 'name',
    formItem: {
      col: { span: 24 },

    }
  },
  {
    title: '活动地点',
    name: 'place',
    formItem: {
      col: { span: 24 },

    }
  },
  {
    title: '活动时间',
    name: 'datetime',
    formItem: {
      type: 'datetime',
      col: { span: 24 },
      formItemLayout: {
        wrapperCol: { span: 10 }
      },
      showTime: true,
      initialValue: moment()
    }
  },
  {
    title: '首页背景图',
    name: 'image',
    formItem: {
      type: 'upload',
      col: { span: 24 },

      listType: 'picture',
      initialValue: [{
        uid: 1,
        thumbUrl: 'https://avatars1.githubusercontent.com/u/34116960'
      }],
      rules: [
        {
          required: true,
          message: '请选择用户头像'
        }
      ],
      maxFileSize: 2400, // 最大限制 kb
      fileTypes: ['.png', '.jpg', '.gif'], // 允许类型
      max: 2
    }
  },

]