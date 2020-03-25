import { routerRedux } from 'dva/router';
import { login, user } from '../service';
import { rest } from '@/utils/request'
import $$ from 'cmn-utils';

export default {
  namespace: 'login',

  state: {
    loggedIn: false,
    message: '',
    user: {}
  },

  subscriptions: {
    setup ({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/sign/login') !== -1) {
          $$.removeStore('user');
        }
      });
    }
  },

  effects: {
    *login ({ payload }, { call, put }) {
      let { id_token } = yield call(login, payload);
      if (id_token) {
        yield $$.setStore('token', id_token);
        yield put(routerRedux.replace('/admin'));
      }
    },
    *logout (_, { put }) { }
  },

  reducers: {
    loginSuccess (state, { payload }) {
      return {
        ...state,
        loggedIn: true,
        message: '',
        user: payload
      };
    },
    loginError (state, { payload }) {
      return {
        ...state,
        loggedIn: false,
        message: payload.message
      };
    }
  }
};
