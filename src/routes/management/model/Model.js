import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import _ from 'lodash'
import { getTableList } from '../server/index'


const namespace = 'manage';

export default modelEnhance({
  namespace: namespace,

  state: {
    data: {
      pageNum: 1,
      pageSize: 10,
      size: 0,
      total: 100,
      totalPages: 10,
      list: [
        {
          name: '1'
        },
        {
          name: '2'
        }
      ]
    }
  },


  effects: {

    *getTableList ({ payload }, { call, put, select }) {
      yield call(getTableList, payload)
    },




  },
  reducers: {
    clear (state) {
      return {
        ...state,
        data: {},
      }
    },
  }
})