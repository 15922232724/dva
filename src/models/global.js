import $$ from 'cmn-utils';
import ReactDOM from 'react-dom';
import { Net } from '@/utils/request'
import modelEnhance from '@/utils/modelEnhance';
import headerImg from './image/header.png'


export default modelEnhance({
  namespace: 'global',

  state: {
    menu: [
      {
        name: '展会信息',
        icon: 'dashboard',
        path: '/admin/home',
      },
      {
        name: '调查问卷',
        icon: 'dashboard',
        path: '/admin/qusetion',
      },
      // {
      //   name: '观众管理',
      //   icon: 'dashboard',
      //   path: '/admin/manage',
      // },
      // {
      //   name: '观众核销',
      //   icon: 'dashboard',
      //   path: '/admin/checked',
      // },
    ],
    flatMenu: [],
    activeInfo: {
      headerImg: headerImg,
      name: '展会名称',
      startTime: '开幕时间',
      endTime: '开幕时间',

      place: '地点'

    }
  },

  effects: {
    *init ({ _ }, { call, put, select }) {
      const menu = yield select(state => state.menu)
      if (menu) {
        yield put({
          type: 'getMenu',
          payload: menu
        })
      }

    },
    *activeInfoInit ({ }, { call, put }) {
      let activeInfo = {
        headerImg: headerImg,
        name: '东北展会',
        startTime: '2012',
        endTime: '2013',

        place: '沈阳'
      }
      yield put({
        type: 'getActiveInfo',
        payload: activeInfo
      })
    }

  },

  reducers: {
    getMenu (state, { payload }) {
      return {
        ...state,
        flatMenu: getFlatMenu(payload),
      };
    },
    getActiveInfo (state, { payload }) {

      return {
        ...state, ...{
          activeInfo: payload
        }
      }
    }
  },
});

export function getFlatMenu (menus) {
  console.log(menus)
  let menu = [];
  menus.forEach(item => {
    if (item.children) {
      menu = menu.concat(getFlatMenu(item.children));
    }
    menu.push(item);
  });
  return menu;
}

