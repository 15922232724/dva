import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import _ from 'lodash'

let LOADED = false;

export default modelEnhance({
  namespace: 'role',

  state: {
    roleList: PageHelper.create(),
    roleUserList: PageHelper.create(),
    role:{},
    authSelect:[],
    allocationModalIsShow:false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // if (pathname === '/role' && !LOADED) {
        // if (pathname === '/role/list' ) {
        //   LOADED = true;
        //   dispatch({
        //     type: 'init'
        //   });
        // }
      });
    }
  },

  effects: {
    /**
     * 初始化角色列表页
     * @param {*} param0 
     * @param {*} param1 
     */
    *initRoleList({ payload }, { call, put, select }) {
      const { roleList } = yield select(state => state.role);
      yield put({
        type: 'getRoleList',
        payload: {
          pageData: roleList.startPage(1, 10)
        }
      });
    },
    /**
     * 初始化角色用户列表
     * @param {}} param0 
     * @param {*} param1 
     */
    *initRoleUserList({ payload }, { call, put, select }) {
      let {id}=payload
      const { roleUserList } = yield select(state => state.role);
      yield put({
        type: 'getRoleUserList',
        payload: {
          pageData: roleUserList.startPage(1, 10),
          id
        }
      });
    },
    /**
     * 获取角色列表数据
     * @param {*} param0 
     * @param {*} param1 
     */
    *getRoleList({ payload }, { call, put }) {
      const { pageData } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'roleList',
          url: `/roles`,
          method: 'GET', 
          pageInfo: pageData
        }
      });
    },
    /**
     * 获取角色用户列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *getRoleUserList({ payload }, { call, put }) {
      const { pageData,id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          valueField: 'roleUserList',
          url: `/roles/${id}/user`,
          method: 'GET', 
          pageInfo: pageData
        }
      });
    },
    /**
     * 设置角色用户列表
     * @param {*} param0 
     * @param {*} param1 
     */
    *putRoleUserList({ payload }, { call, put, select }) {
      const { value,id } = payload;
      const { roleUserList } = yield select(state => state.role);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `/roles/${id}/user`,
          method: 'POST', 
          data: value,
        }
      });
      yield put({
        type: 'getRoleUserList',
        payload: { 
          pageData:roleUserList,
          id
         }
      });
      yield put({
        type: 'reduceAllocationModalIsShow',
        payload: { isShow:false }
      });
    },
    *deleteRoleUserList({ payload }, { call, put, select }) {
      const { value,id } = payload;
      const { roleUserList } = yield select(state => state.role);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: `/roles/${id}/user`,
          method: 'DELETE', 
          data: value,
        }
      });
      yield put({
        type: 'getRoleUserList',
        payload: { 
          pageData:roleUserList,
          id
         }
      });
    },
    /**
     * 获取角色
     * @param {*} param0 
     * @param {*} param1 
     */
    *getRole({ payload }, { call, put }) {
      const { id } = payload;
      yield put.resolve({
        type: '@request',
        payload: {
          actionType: 'reduceRole',
          // valueField: 'role',
          url: `/roles/${id}`,
          method: 'GET', 
        }
      });
    },
    
    /**
     * 保存角色
     * @param {*} param0 
     * @param {*} param1 
     */
    *saveRole({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.role);
      yield put.resolve({
        type: '@request',
        payload: {
          notice: true,
          url: '/roles',
          data: value
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    /**
     * 修改角色
     * @param {*} param0 
     * @param {*} param1 
     */
    *updateRole({ payload }, { call, put, select,take }) {
      const { value, success } = payload;
      const { pageData } = yield select(state => state.role);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'PUT',
          notice: true,
          url: '/roles',
          data: value
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    /**
     * 删除角色 之后查询分页
     * @param {*} param0 
     * @param {*} param1 
     */
    *removeRole({ payload }, { call,take , put, select }) {
      const { records, success } = payload;
      const { pageData } = yield select(state => state.role);
      yield put.resolve({
        type: '@request',
        payload: {
          method: 'DELETE',
          notice: true,
          url: '/roles',
          data: records.map(item => item.rowKey)
        }
      });
      yield put({
        type: 'getPageInfo',
        payload: { pageData }
      });
      success();
    },
    /**
     * 显示角色分配模态框
     */
    *showAllocationModalIsShow({ payload }, { call,take , put, select }){
      yield put({
        type: 'user/initList',
      });
      yield put({
        type: 'reduceAllocationModalIsShow',
        payload: { isShow:true }
      });
    },
    /**
     * 隐藏角色分配模态框
     */
    *hidenallocationModalIsShow({ payload }, { call,take , put, select }){
      yield put({
        type: 'reduceAllocationModalIsShow',
        payload: { isShow:false }
      });
    }
  },

  reducers: {
    reduceRole_SUCCESS(state,{payload}){
      return {
        ...state,
        role:payload,
        authSelect:payload.authorities
        // authSelect:payload.authorities.map(a=>a.code)
      }
    },
    clearRole(state){
        return {
          ...state,
          role:null,
          authSelect:[],
        }
    },
    reduceAllocationModalIsShow(state,{payload}){
        return {
          ...state,
          allocationModalIsShow:payload.isShow
        }
    }
  }
});