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
      console.log(1)
      yield put(routerRedux.replace('/admin'));
      yield $$.setStore('user', '133');

      // const { id_token, message } = yield call(login, payload);
      // if (id_token) {
      //   yield $$.setStore('token', id_token);

      // } else {
      //   yield put({
      //     type: 'loginError'
      //   });
      // }
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
