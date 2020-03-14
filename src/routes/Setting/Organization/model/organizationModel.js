import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import * as actions from '../actions/organizationAction'
import _ from 'lodash'
let LOADED = false;

export default modelEnhance({
  namespace: actions.NAME_SPACE,

  state: {
    pageData: PageHelper.create(),
    allData: [],
    organizationData:null,
    // userData:null,
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
    *initList(_, { call, put, select }) {
      const { pageData } = yield select(state => state.organization);
      yield put(actions.getList({
        pageData: pageData.startPage(1, 10)
      }));
    },
    // 获取用户数据
    *getOrganization({ payload }, { call, put }) {
      let { id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'organizationData',
          url: `/organizations/${id}`,
          method: 'GET', 
        }
      });
    },
    // 获取分页数据
    *getList({ payload }, { call, put }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'allData',
          url: '/organizations',
          method: 'GET', 
          data: payload && payload.pageData && _.omitBy(payload.pageData.filters,_.isUndefined)
        }
      });
    },
    // 保存 之后查询分页
    *saveOrganization({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      // const { pageData } = yield select(state => state.organization);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/organizations',
          data: value,
          method: 'POST',
        }
      });
      yield put({
        type: 'getList',
        // payload: { pageData }
      });
      success();
    },
    // 修改
    *updateOrganization({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      // const { pageData } = yield select(state => state.user);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'PUT',
          notice: true,
          url: '/organizations',
          data: value
        }
      });
      yield put({
        type: 'getPageInfo',
        // payload: { pageData }
      });
      success();
    },
    // 删除 之后查询分页
    *removeOrganization({ payload }, { call,take , put, select }) {
      const { records, success } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'DELETE',
          notice: true,
          url: '/organizations',
          data: records.map(item => item.rowKey)
        }
      });
      yield put.resolve({
        type: 'getList',
      });
      success();
    }
  },

  reducers: {
    clearOrganization(prev){
      return Object.assign(prev,{
        organizationData:null,
      })
    }
  }
});