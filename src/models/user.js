import { getListData, code, setPassWord } from '../service/user';
import { message } from 'antd';
import router from 'umi/router';

const DefaultUser = {
  isLogin: localStorage.getItem('meiToken') === null ? false : true,
};

export default {
  namespace: 'user',
  state: DefaultUser,
  effects: {
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
      if (!res.data.userinfo.firstPas) {
        // 第一次登录 需要设置密码
        router.push('/setPass' + window.location.search);
      } else {
        // 跳转回登录页面
        console.log(router.query);
      }
      localStorage.setItem('meiToken', res.data.token);
      localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo));
      yield put({ type: 'codeState', payload: res.data });
    },
    // 设置密码
    *setPassWordDemo({ values }, { call, put }) {
      const res = yield call(setPassWord, values);
      if (res.data.code === 1) {
        let str = window.location.search.substr(1);
        let arr = str.split('&');
        for (let i = 0; i < arr.length; i++) {
          var brr = arr[i].split('=');
          if (brr[0] === 'url') {
            router.push(`/${brr[1]}`);
          }
        }
        // router.push('/acount');
      } else {
        message.error(res.data.message);
      }
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
      }
      return newState;
    },
  }, //更新状态
};
