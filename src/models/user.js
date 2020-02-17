import { getListData, code, setPassWord, getUserInfoData, passwordLogin } from '../service/user';
import { message } from 'antd';
import router from 'umi/router';
import routerPush from '../../utils/push';

const DefaultUser = {
  isLogin: localStorage.getItem('meituanToken') === null ? false : true,
  userinfo: null,
};

export default {
  namespace: 'user',
  state: DefaultUser,
  effects: {
    // 通过密码登录
    *password({ value }, { call, put }) {
      const res = yield call(passwordLogin, value);
      if (res.data.code === 3) {
        message.error(res.data.message);
      } else {
        router.push(`/${routerPush()}`);
      }
      localStorage.setItem('meituanToken', res.data.token);
      localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo));
      yield put({ type: 'codeState', payload: res.data });
    },
    // 获取用户信息
    *userInfoData({ id }, { call, put }) {
      const res = yield call(getUserInfoData, id);
      yield put({ type: 'userInfoDataMy', payload: res.data });
    },
    // 获取验证码
    *getCode(action, { call, put }) {
      const res = yield call(getListData, action.value);
      yield put({ type: 'getYanCode', payload: res.data });
    },
    // 判断验证码并且注册
    *code({ value }, { call, put }) {
      const res = yield call(code, value);
      console.log(res);
      if (res.data.code === 3) {
        message.error(res.data.message);
      }
      if (!res.data.biao.firstPas) {
        // 第一次登录 需要设置密码
        router.push('/setPass' + window.location.search);
      } else {
        // 跳转回登录页面
        router.push(`/${routerPush()}`);
      }
      localStorage.setItem('meituanToken', res.data.token);
      localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo));
      yield put({ type: 'codeState', payload: res.data });
    },
    // 设置密码
    *setPassWordDemo({ values }, { call, put }) {
      const res = yield call(setPassWord, values);
      if (res.data.code === 1) {
        // router.push('/acount');
        router.push(`/${routerPush()}`);
      } else {
        message.error(res.data.message);
      }
    },
    // 退出登录
    *clearStroge(action, { call, put }) {
      console.log(1);
      yield put({ type: 'qingStroge' });
    },
  }, //异步操作
  reducers: {
    getYanCode(state, action) {
      if (action.payload.stat === '100') {
        message.success('验证码发送成功!');
      }
      return state;
    },
    codeState(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      if (action.payload.code === 1) {
        newState.isLogin = true;
        newState.userinfo = action.payload.biao;
      }
      return newState;
    },
    userInfoDataMy(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userinfo = action.payload;
      return newState;
    },
    qingStroge(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userinfo = null;
      return newState;
    },
  }, //更新状态
};
