import React, { Fragment } from 'react';
import DataTable, { EditableOper } from 'components/DataTable';
import Icon from 'components/Icon';
import { Button } from 'antd';
export function tableConfig (that) {
  return [
    {
      title: '姓名',
      name: 'name',
      tableItem: {}
    },
    {
      title: '电话',
      name: 'tel',
      tableItem: {}
    },
    {
      title: '称谓',
      name: 'rename',
      tableItem: {}
    },
    {
      title: '职务',
      name: 'zhiwu',
      tableItem: {}
    },
    {
      title: '公司',
      name: 'gongsi',
      tableItem: {}
    },
    {
      title: '主营',
      name: 'zhuying',
      tableItem: {}
    },
    {
      title: '省份',
      name: 'shengfen',
      tableItem: {}
    },
    {
      title: '城市',
      name: 'city',
      tableItem: {}
    },
    {
      title: '买家团',
      name: 'maijiatuan',
      tableItem: {}
    },
    {
      title: '操作',
      tableItem: {
        width: 180,
        render: (text, record) => {
          console.log(text, record)
          return (
            <DataTable.Oper>
              <Button tooltip="修改" onClick={(e) => that.onUpdate(record)} >
                <Icon type="edit" />
              </Button>
              <Button tooltip="删除" onClick={() => that.onDelete(record)}>
                <Icon type="trash" />
              </Button>
            </DataTable.Oper >
          )
        }
      }
    }
  ];
}
export function searchConfig () {
  return [{
    title: '电话号',
    name: 'tel',
    searchItem: {
      width: 300,
    }
  },
  {
    title: '姓名',
    name: 'name',
    searchItem: {
      width: 300,

    }
  },
  {
    title: '职务',
    name: 'zhiwu',
    searchItem: {
    }
  },
  {
    title: '公司',
    name: 'gongsi',
    searchItem: {
      width: 300,

    }
  },
  {
    title: '主营',
    name: 'zhuying',
    searchItem: {
    }
  },
  {
    title: '地理信息',
    name: 'key1',
    searchItem: {
      type: 'cascade',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou'
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing'
            }
          ]
        }
      ]
    }
  },
  {
    title: '信息选择',
    name: 'key1',
    searchItem: {
      type: 'cascade',
      options: [
        {
          value: '预登记观众',
          label: '预登记观众',

        },
        {
          value: '已核销观众',
          label: '已核销观众',

        },
        {
          value: '现场核销观众',
          label: '现场核销观众',

        }
      ]
    }
  },
  {
    title: '时间类型',
    name: 'timeType',
    searchItem: {
      type: 'cascade',
      options: [
        {
          value: '0',
          label: '预登记时间',

        },
        {
          value: '1',
          label: '现场核销时间',

        },

      ]
    }
  },
  {
    title: '选择时间',
    name: 'date2',
    searchItem: {
      type: 'date~',
      width: 500,
      placeholder: ['开始时间', '结束时间']
    }
  },
  ];
}

