import { getDianZan, getPingLun } from '../service/hot';

const homeList = {};

export default {
  namespace: 'hot',
  state: homeList,
  effects: {
    *ping({ data }, { call, put }) {
      const res = yield call(getPingLun, data);
    },
    *zan({ id }, { call, put }) {
      const res = yield call(getDianZan, id);
      yield put({ type: 'initAdds', payload: res.data });
    },
    *quxiaoZan({}, { put }) {
      yield put({ type: 'quxiaoAdd' });
    },
  }, //异步操作
  reducers: {
    initAdds(state, action) {
      return { ...state, add: action.payload };
    },
    quxiaoAdd(state, action) {
      return { ...state, add: null };
    },
  },
};
