import { messageListDefault, firstMessageData, friendsTouXiang } from '../service/chat';
const defaultState = {
  messageList: [],
  huo: true,
  tou: '',
};

export default {
  namespace: 'chat',
  state: defaultState,
  effects: {
    *submitMessage({ value }, { call, put }) {
      yield call(messageListDefault, value);
    },
    *first({ data }, { call, put }) {
      const res = yield call(firstMessageData, data);
      yield put({ type: 'initFirstData', payload: res.data });
    },
    *friendsAvatar({ data }, { call, put }) {
      const res = yield call(friendsTouXiang, data);
      yield put({ type: 'friendsTou', payload: res.data });
    },
  },
  reducers: {
    initFirstData(state, action) {
      return { ...state, messageList: action.payload, huo: false };
    },
    friendsTou(state, action) {
      return { ...state, tou: action.payload };
    },
  },
};
