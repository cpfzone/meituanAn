import { getListData, getDetailListLi, getDataSuggest, putHotData } from '../service/list';
import randomNumber from '../../utils/luan';
import { message } from 'antd';

const homeList = {
  arr: [],
  detailArr: {},
  result: {},
  hotList: [],
  refreshing: false,
};

export default {
  namespace: 'list',
  state: homeList,
  effects: {
    // 获取热门内容
    *hotData({}, { call, put }) {
      const res = yield call(putHotData);
      // 随机打乱
      res.data.sort(randomNumber);
      yield put({ type: 'initHotData', payload: res.data });
    },
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
    *refChange({ value }, { call, put }) {
      yield put({ type: 'getRefChange' });
      message.success('为你更新数据完成');
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
    initHotData(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.hotList = action.payload;
      newState.refreshing = false;
      return newState;
    },
    getRefChange(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.refreshing = true;
      return newState;
    },
  }, //更新状态
};
