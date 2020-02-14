import { getListData, code } from '../service/user';
import { message } from 'antd';

const DefaultUser = {
  isLogin: false,  // 是否登录
  isCode: false,   // 验证码是否发送
};

export default {
  namespace: 'user',
  state: DefaultUser,
  effects: {
    *getCode(action, { call, put }) {
      const res = yield call(getListData, action.value);
      yield put({ type: 'getYanCode', payload: res.data });
    },
    *code({ value }, { call, put }) {
      const res = yield call(code, value);
      yield put({ type: 'codeState', payload: res.data });
    },
  }, //异步操作
  reducers: {
    getYanCode(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      if (action.payload.stat === '100') {
        newState.isCode = true;
        message.success('验证码发送成功!');
      } else {
        newState.isCode = false;
      }
      return newState;
    },
    codeState(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      if (action.payload.code === 2) {
        newState.isCode = false;
        message.error('验证码错误');
      } 
      console.log(action);
      return newState;
    },
  }, //更新状态
};
