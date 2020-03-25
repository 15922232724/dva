import React from 'react';
import moment from 'moment';
import { InputNumber, Button } from 'antd';
export const columns = (that) => {
  return [,
    {
      title: '展会届次',
      name: 'times',
      dict: [{ code: 1, codeName: '第一届' }, { code: 2, codeName: '第二届' }, { code: 3, codeName: '第三届' }],
      tableItem: {},
      formItem: {
        type: 'select',
        initialValue: 1,
        onChange: (info, value) => { that.timeChange(value) }
      }

    },
    {
      title: '展会状态',
      name: 'status',
      dict: [{ code: 0, codeName: '已完成' }, { code: 1, codeName: '进行中' }, { code: 2, codeName: '未开始' }],
      tableItem: {},
      formItem: {
        type: 'select'
      },

    },
    {
      title: '展会名称',
      name: 'name',

    },
    {
      title: '活动地点',
      name: 'place',
      formItem: {

      }
    },
    {
      title: '活动时间',
      name: 'date',
      formItem: {
        type: 'datetime',
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

        listType: 'picture',

        rules: [
          {
            required: true,
            message: '请添加展会信息图片！'
          }
        ],
        maxFileSize: 2400, // 最大限制 kb
        fileTypes: ['.png', '.jpg', '.gif'], // 允许类型
        max: 1
      }
    },

  ]
}