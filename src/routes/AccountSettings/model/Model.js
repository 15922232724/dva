import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import _ from 'lodash'

const pathBase = 'account';
const namespace = 'accountsetting';

export default modelEnhance({
  namespace: namespace,

  state: {
    pagefilter: PageHelper.create(),
    list: [],
    data:{},
    select:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      });
    }
  },

  effects: {
    /**
     * 初始化
     * @param {*} param0 
     * @param {*} param1 
     */
    *init({ payload }, { call, put, select }) {
      yield put({
        type: 'get',
      });
    },
 
    /**
     * 获取
     * @param {*} param0 
     * @param {*} param1 
     */
    *get({ payload }, { call, put }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'data',
          url: `/${pathBase}`,
          method: 'GET', 
        }
      });
    },
    
 
    /**
     * 修改
     * @param {*} param0 
     * @param {*} param1 
     */
    *update({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'POST',
          notice: true,
          url: `/${pathBase}/change-user-information`,
          data: value
        }
      });
      yield put({
        type: 'get',
      });
      success();
    },
    /**
     * 更新密码
     * @param {*} param0 
     * @param {*} param1 
     */
    *changePassword({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'POST',
          notice: true,
          url: `/${pathBase}/change-password`,
          data: value
        }
      });
      success();
    },

  },
  reducers: {
    clear(state){
      return {
        ...state,
        data:{},
      }
    },
  }
})