import { addUserLiao, tianUserLiao } from '../service/liao';
import { message } from 'antd';

const defaultState = {
  addUsers: [],
};

export default {
  namespace: 'liao',
  state: defaultState,
  effects: {
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
  },
  reducers: {
    initAddUser(state, action) {
      return { ...state, addUsers: action.payload };
    },
  },
};
