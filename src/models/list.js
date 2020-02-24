import { getListData, getDetailListLi } from '../service/list';

const homeList = {
  arr: [],
  detailArr: {},
};

export default {
  namespace: 'list',
  state: homeList,
  effects: {
    *getList(action, { call, put }) {
      const res = yield call(getListData);
      yield put({ type: 'initList', payload: res.data });
    },
    *getDetailList({ value }, { call, put }) {
      const res = yield call(getDetailListLi,value);
      yield put({ type: 'detailList', payload: res.data });
    },
  }, //异步操作
  reducers: {
    initList(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.arr = action.payload;
      return newState;
    },
    detailList(state,action){
      const newState = JSON.parse(JSON.stringify(state));
      newState.detailArr = action.payload;
      return newState;
    }
  }, //更新状态
};
