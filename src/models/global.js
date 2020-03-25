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
      {
        name: '观众管理',
        icon: 'dashboard',
        path: '/admin/manage',
      },
      {
        name: '观众核销',
        icon: 'dashboard',
        path: '/admin/writeoff',
      },
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

      yield call(getActiveInfo)
      console.log(info)
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
    },
    *activeInfoUpdate ({ payload }, { call, put }) {
      let photoId = null
      const newInfo = {}
      if (payload.image) {
        var photoData = new FormData();
        console.log(payload.image[0])
        photoData.append('file', payload.image[0].originFileObj)
        let info = yield call(updatePhoto, photoData)
        photoId = info.id
        newInfo.headerImg = payload.image[0].thumbUrl
      }
      let saveInfo = { ...payload, ...{ picId: photoId } }
      delete saveInfo[image]
      console.log(saveInfo)
      let info = yield call(saveExpoInfo, saveInfo)
      console.log(info)
      yield put({
        type: 'getActiveInfo',
        payload: newInfo
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
export async function getActiveInfo () {
  return Net.get('/expoinfo/getAllExpoInfo')
}
export async function updatePhoto (payload) {
  console.log(payload)
  return Net.post('/db-file/update', payload)
}
export async function saveExpoInfo (payload) {
  console.log(payload)
  return Net.post('/expoinfo/saveExpoInfo', payload)
}
