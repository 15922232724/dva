import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import _ from 'lodash'

let LOADED = false;

export default modelEnhance({
  namespace: 'dict',

  state: {
    dictListFilter: PageHelper.create(),
    dictList: [],
    dict:{},
    dictValue:{},
    allocationModalIsShow:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      });
    }
  },

  effects: {
    /**
     * 初始化字典列表页
     * @param {*} param0 
     * @param {*} param1 
     */
    *initDictList({ payload }, { call, put, select }) {
      const { dictList } = yield select(state => state.dict);
      yield put({
        type: 'getDictList',
        payload: {
          pageData: dictList
        }
      });
    },
    /**
     * 获取字典列表数据
     * @param {*} param0 
     * @param {*} param1 
     */
    *getDictList({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/dict_type`,
          method: 'GET', 
          valueField: 'dictList',
          pageInfo: pageData
        }
      });
    },
    *getDict({ payload }, { call, put }) {
      const { id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/dict_type/${id}`,
          method: 'GET', 
          valueField: 'dict',
        }
      });
    },
    *getDictValue({ payload }, { call, put }) {
      const { id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          url: `/dict/${id}`,
          method: 'GET', 
          valueField: 'dictValue',
        }
      });
    },
    /**
     * 保存字典
     * @param {*} param0 
     * @param {*} param1 
     */
    *saveDict({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.dict);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/dict_type',
          data: value
        }
      });
      yield put({
        type: 'getDictList',
        payload: { pageData }
      });
      success();
    },
    /**
     * 保存字典
     * @param {*} param0 
     * @param {*} param1 
     */
    *saveDictValue({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.dict);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/dict',
          data: value
        }
      });
      // yield put({
      //   type: 'getDictList',
      //   payload: { pageData }
      // });
      success();
    },
    /**
     * 修改字典
     * @param {*} param0 
     * @param {*} param1 
     */
    *updateDict({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.dict);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'PUT',
          notice: true,
          url: '/dict_type',
          data: value
        }
      });
      yield put({
        type: 'getDict',
        payload: { pageData }
      });
      success();
    },
    /**
     * 修改字典值
     * @param {*} param0 
     * @param {*} param1 
     */
    *updateDictValue({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.dict);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'PUT',
          notice: true,
          url: '/dict',
          data: value
        }
      });
      // yield put({
      //   type: 'getDict',
      //   payload: { pageData }
      // });
      success();
    },
    /**
     * 删除字典 之后查询分页
     * @param {*} param0 
     * @param {*} param1 
     */
    *removeDict({ payload }, { call,take , put, select }) {
      const { records, success } = payload;
      const { dictListFilter } = yield select(state => state.dict);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'DELETE',
          notice: true,
          url: '/dict_type',
          data: records.map(item => item.rowKey)
        }
      });
      yield put({
        type: 'getDictList',
        payload: { dictListFilter }
      });
      success();
    },
        /**
     * 删除字典值 之后查询分页
     * @param {*} param0 
     * @param {*} param1 
     */
    *removeDictValue({ payload }, { call,take , put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.dict);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'DELETE',
          notice: true,
          url: '/dict',
          data: records.map(item => item.id)
        }
      });
      // yield put({
      //   type: 'getDict',
      //   payload: { pageData }
      // });
      success();
    },
  },

  reducers: {
    // reduceDict_SUCCESS(state,{payload}){
    //   return {
    //     ...state,
    //     role:payload,
    //     authSelect:payload.authorities
    //     // authSelect:payload.authorities.map(a=>a.code)
    //   }
    // },
    clearDict(state){
        return {
          ...state,
          dict:null,
          dictValue:null,
          // authSelect:[],
        }
    },
    // reduceAllocationModalIsShow(state,{payload}){
    //     return {
    //       ...state,
    //       allocationModalIsShow:payload.isShow
    //     }
    // }
  }
});