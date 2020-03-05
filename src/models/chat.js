import { messageListDefault } from '../service/chat';
const defaultState = {
  messageList: [],
};

export default {
  namespace: 'chat',
  state: defaultState,
  effects: {
    *submitMessage({ value }, { call, put }) {
      yield call(messageListDefault, value);
    },
  },
  reducers: {},
};
