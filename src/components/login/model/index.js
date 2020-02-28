import modelEnhance from '../../../utils/modelEnhance';



const namespace = 'login';

export default modelEnhance({
  namespace: namespace,

  state: {
    test: '11'
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => { });
    }
  },

  effects: {

  },
  reducers: {

  }
});
