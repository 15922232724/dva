import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import {Net} from '@/utils/request'
import _ from 'lodash'

const pathBase = 'area';
const namespace = 'area';

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
     * 获取列表数据
     * @param {*} param0 
     * @param {*} param1 
     */
    *getList({ payload }, { call, put }) {
      const { pageData:{filters} } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'list',
          url: `/${pathBase}`,
          method: 'GET', 
          data: {code:filters.code}
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
          actionType: 'reduceGet',
          url: `/${pathBase}/${id}`,
          method: 'GET', 
        }
      });
    },
    /**
     * 获取子节点
     * @param {*} param0 
     * @param {*} param1 
     */
    *getChildren({ payload }, { call, put }) {
      const { pid } = payload;
      const data = yield call(getChildrenService, {payload});
      if(data){
        yield put({
          type: 'reduceChildren_SUCCESS',
          payload: { data,pid }
        });
      }
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
          data: records.map(item => item.rowKey)
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
    reduceGet_SUCCESS(state,{payload}){
      return {
        ...state,
        data:{
          ...payload,
          parent:payload && payload.parent && payload.parent.code,
        }
      }
    },
    reduceChildren_SUCCESS(state,{payload}){
      const newList = _.cloneDeepWith(state.list)
      const { data,pid } = payload;
      //获取到的子节点       
      let children = data || []
      children = children.map(item=>{
        return {
          ...item,
          children:item.children||[],
        }
      })
      const dataMap = (items) => {
        items.find((item) => {
          if (item.code === pid) {
            //找到当前要展开的节点
            item.children = children
            return items
          }
          if (item.children && item.children.length > 0) {
            dataMap(item.children)
          }
        })
      }
      dataMap(newList|| [])
      return {
        ...state,
        list:newList,
      }
  
    }
  }
})

async function getChildrenService({payload}) {
  const { pid } = payload;
  return Net.post(`/${pathBase}/get_children?pid=${pid}`, payload,{afterResponse:null});
}