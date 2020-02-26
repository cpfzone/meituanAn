import {
  getListData,
  code,
  setPassWord,
  getUserInfoData,
  passwordLogin,
  gaiMing,
  resetLoginPassword,
  uploadfile,
} from '../service/user';
import { message } from 'antd';
import router from 'umi/router';
import routerPush from '../../utils/push';

const DefaultUser = {
  isLogin: window.localStorage.getItem('meituanToken') === null ? false : true,
  userinfo: null,
  city: '北京',
};

export default {
  namespace: 'user',
  state: DefaultUser,
  effects: {
    // 修改城市
    *citySouHu({ name }, { call, put }) {
      yield put({ type: 'cityState', name });
    },
    // 上传头像
    *fileImg({ file }, { call, put }) {
      const res = yield call(uploadfile, file);
    },
    // 修改密码
    *resetPassword({ values }, { call, put }) {
      const res = yield call(resetLoginPassword, values);
      if (res.data.code !== 1) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
        router.go(-1);
      }
    },
    // 通过密码登录
    *password({ value }, { call, put }) {
      const res = yield call(passwordLogin, value);
      if (res.data.code === 3) {
        message.error(res.data.message);
      } else {
        router.push(`/${routerPush()}`);
      }
      window.localStorage.setItem('meituanToken', res.data.token);
      window.localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo));
      yield put({ type: 'codeState', payload: res.data });
    },
    // 修改用户名
    *changeName({ value }, { call, put }) {
      const res = yield call(gaiMing, value);
      if (res.data.code === 2) {
        message.error(res.data.message);
      }
      message.success(res.data.message);
      yield put({ type: 'getMingZi', payload: value });
      router.go(-1);
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
      window.localStorage.setItem('meituanToken', res.data.token);
      window.localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo));
      yield put({ type: 'codeState', payload: res.data });
    },
    // 设置密码
    *setPassWordDemo({ values }, { call, put }) {
      const res = yield call(setPassWord, values);
      if (res.data.code === 1) {
        // router.push('/acount');
        const a = routerPush();
        if (a === undefined) {
          router.push(`/`);
        } else {
          router.push(`/${a}`);
        }
      } else {
        message.error(res.data.message);
      }
    },
    // 退出登录
    *clearStroge(action, { call, put }) {
      yield put({ type: 'qingStroge' });
    },
  }, //异步操作
  reducers: {
    cityState(state, action) {
      return { ...state, city: action.name };
    },
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
    getMingZi(state, action) {
      const newState = JSON.parse(JSON.stringify(state));
      newState.userinfo.name = action.payload.name;
      return newState;
    },
  }, //更新状态
};
