import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import * as actions from '../action/userAction'
let LOADED = false;

export default modelEnhance({
  namespace: actions.NAME_SPACE,

  state: {
    pageData: PageHelper.create(),
    userData:null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // if (pathname === '/user') {
        // // if (pathname === '/user' && !LOADED) {
        //   LOADED = true;
        //   dispatch({
        //     type: 'init'
        //   });
        // }
      });
    }
  },

  effects: {
    // 进入页面加载
    *initList({ payload }, { call, put, select }) {
      const { pageData } = yield select(state => state.user);
      yield put(actions.getList({
        pageData: pageData.startPage(1, 10)
      }));
    },
    // 获取用户数据
    *getUser({ payload }, { call, put }) {
      let { id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'userData',
          url: `/users/${id}`,
          method: 'GET', 
        }
      });
    },
    // 获取分页数据
    *getList({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'pageData',
          url: '/users',
          method: 'GET', 
          pageInfo: pageData
        }
      });
    },
    // 保存 之后查询分页
    *saveUser({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.user);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/users',
          data: value
        }
      });
      yield put({
        type: 'getList',
        payload: { pageData }
      });
      success();
    },
    // 修改
    *updateUser({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.user);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'PUT',
          notice: true,
          url: '/users',
          data: value
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    // 删除 之后查询分页
    *removeUser({ payload }, { call,take , put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.user);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'DELETE',
          notice: true,
          url: '/users',
          data: records.map(item => item.rowKey)
        }
      });
      yield put.resolve({
        type: 'getList',
        payload: { pageData }
      });
      success();
    }
  },

  reducers: {
    clearUser(prev){
      return Object.assign(prev,{
        userData:null,
      })
    }
  }
});