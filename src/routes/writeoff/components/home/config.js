import React, { Fragment } from 'react';
import DataTable, { EditableOper } from 'components/DataTable';
import Icon from 'components/Icon';
import { Button } from 'antd';
export function tableConfig (that) {
  return [
    {
      title: '姓名',
      name: 'name',
      tableItem: {},
      formItem: {

      },

    },
    {
      title: '电话',
      name: 'tel',
      tableItem: {},
      formItem: {
      }
    }, {
      title: '称谓',
      name: 'tel',
      tableItem: {},
      formItem: {

      }
    }, {
      title: '邮箱',
      name: 'tel',
      tableItem: {},
      formItem: {

      }
    }, {
      title: '职务',
      name: 'tel',
      tableItem: {},
      formItem: {

      }
    },
    {
      title: '公司',
      name: 'tel',
      tableItem: {},
      formItem: {

      }
    },
    {
      title: '主营',
      name: 'tel',
      tableItem: {},
      formItem: {

      }
    },
    {
      title: '地区',
      name: 'tel',
      tableItem: {},
      formItem: {

      }
    },
    {
      title: '买家团',
      name: 'tel',
      tableItem: {},
      formItem: {

      }
    }, {
      title: 'id',
      name: 'id',
      searchItem: {},

    }



  ];
}