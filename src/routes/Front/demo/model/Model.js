import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import _ from 'lodash'

const pathBase = 'home';
const namespace = 'home';

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
    *initList({ payload }, { call, put, select }) {
      const { pagefilter } = yield select(state => state[namespace]);
      yield put({
        type: 'getList',
        payload: {
          pageData: pagefilter.startPage(1, 10)
        }
      });
    },

    /**
     * 获取
     * @param {*} param0 
     * @param {*} param1 
     */
    *get({ payload }, { call, put }) {
      const { id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'data',
          url: `/${pathBase}/${id}`,
          method: 'GET', 
        }
      });
    },
    
    /**
     * 保存
     * @param {*} param0 
     * @param {*} param1 
     */
    *save({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pagefilter } = yield select(state => state[namespace]);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `/${pathBase}`,
          data: value
        }
      });
      yield put({
        type: 'getList',
        payload: { pageData:pagefilter }
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