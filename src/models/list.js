import { getListData, getDetailListLi, getDataSuggest } from '../service/list';

const homeList = {
  arr: [],
  detailArr: {},
  result: {},
};

export default {
  namespace: 'list',
  state: homeList,
  effects: {
    // 获取搜索内容
    *keySuggest({ value }, { call, put }) {
      const res = yield call(getDataSuggest, value);
      yield put({ type: 'initList', payload: res.data.data.suggestItems });
    },
    *getList(action, { call, put }) {
      const res = yield call(getListData);
      yield put({ type: 'getListData', payload: res.data });
    },
    *getDetailList({ value }, { call, put }) {
      const res = yield call(getDetailListLi, value);
      yield put({ type: 'detailList', payload: res.data });
    },
  }, //异步操作
  reducers: {
    initList(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.result = action.payload;
      return newState;
    },
    detailList(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.detailArr = action.payload;
      return newState;
    },
    getListData(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.arr = action.payload;
      return newState;
    },
  }, //更新状态
};
