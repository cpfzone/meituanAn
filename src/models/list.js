import { getListData } from '../service/list';

const homeList = {
  arr: [],
};

export default {
  namespace: 'list',
  state: homeList,
  effects: {
    *getList(action, { call, put }) {
      const res = yield call(getListData);
      yield put({ type: 'initList', payload: res.data.list });
    },
  }, //异步操作
  reducers: {
    initList(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.arr = action.payload;
      return newState;
    },
  }, //更新状态
};
