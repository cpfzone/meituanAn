import { addUserLiao, tianUserLiao, getFriendsList, tongYiFriend } from '../service/liao';
import { message } from 'antd';

const defaultState = {
  addUsers: [],
  friendsList: [],
};

export default {
  namespace: 'liao',
  state: defaultState,
  effects: {
    *submitFriend({ value }, { call, put }) {
      const res = yield call(tongYiFriend, value);
      if (res.data.n == 1) {
        message.success('添加成功');
      }
    },
    *add({ value }, { call, put }) {
      const res = yield call(addUserLiao, value);
      yield put({ type: 'initAddUser', payload: res.data });
    },
    *tian({ value }, { call, put }) {
      const res = yield call(tianUserLiao, value);
      if (res.data.n == 1) {
        message.success('添加成功');
      }
    },
    *firendsList({ id }, { call, put }) {
      const res = yield call(getFriendsList, id);
      yield put({ type: 'firendsListGetData', payload: res.data });
    },
  },
  reducers: {
    initAddUser(state, action) {
      return { ...state, addUsers: action.payload };
    },
    firendsListGetData(state, action) {
      return { ...state, friendsList: action.payload };
    },
  },
};
