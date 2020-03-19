import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import _ from 'lodash'

const pathBase = 'manage';
const namespace = 'home';

export default modelEnhance({
  namespace: namespace,

  state: {
    data: {},
  },


  effects: {

    *initList ({ payload }, { call, put, select }) {

    },



  },
  reducers: {
    clear (state) {
      return {
        ...state,
        data: {},
      }
    },
  }
})