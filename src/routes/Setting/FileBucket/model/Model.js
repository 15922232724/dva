import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import _ from 'lodash'

const pathBase = 'file-bucket';
const filePathBase = 'file';
const namespace = 'fileBucket';

export default modelEnhance({
  namespace: namespace,

  state: {
    pagefilter: PageHelper.create(),
    filePage: PageHelper.create(),
    list: [],
    data:{},
    fileData:{},
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
     * 获取列表数据
     * @param {*} param0 
     * @param {*} param1 
     */
    *getList({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'list',
          url: `/${pathBase}`,
          method: 'GET', 
          // data: pageData
        }
      });
    },
     *getFileList({ payload }, { call, put }) {
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'filePage',
          url: `/${filePathBase}`,
          method: 'GET', 
          pageInfo: payload
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
     * 获取文件
     * @param {*} param0 
     * @param {*} param1 
     */
    *getFile({ payload }, { call, put }) {
      const { id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'fileData',
          url: `/${filePathBase}/${id}`,
          method: 'GET', 
        }
      });
    },
    *uplodade({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pagefilter } = yield select(state => state[namespace]);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `/${filePathBase}/save-all`,
          data: value
        }
      });
      success();
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
    /**
     * 修改
     * @param {*} param0 
     * @param {*} param1 
     */
    *update({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pagefilter } = yield select(state => state[namespace]);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'PUT',
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
    /**
     * 删除
     * @param {*} param0 
     * @param {*} param1 
     */
    *remove({ payload }, { call,take , put, select }) {
      const { records, success } = payload;
      const { pagefilter } = yield select(state => state[namespace]);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'DELETE',
          notice: true,
          url: `/${pathBase}`,
          data: records.map(item => item.id)
        }
      });
      yield put({
        type: 'getList',
        payload: { pageData:pagefilter }
      });
      success();
    },
    /**
     * 删除文件
     * @param {*} param0 
     * @param {*} param1 
     */
    *removeFile({ payload }, { call,take , put, select }) {
      const { id,records, success } = payload;
      const { filePage } = yield select(state => state[namespace]);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'DELETE',
          notice: true,
          url: `/${filePathBase}`,
          data: records.map(item => item.rowKey)
        }
      });
      yield put({
        type: 'getFileList',
        payload:filePage.filter({ bucketId:id })
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