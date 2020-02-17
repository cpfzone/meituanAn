import Axios from 'axios';
import { getCode } from '../../utils/code';
// api
export const getListData = phone => {
  return Axios({
    method: 'get',
    params: {
      code: getCode(6),
      phone,
    },
    url: '/server/user/phone',
  });
};

export const login = phone => {
  return Axios({
    method: 'post',
    data: {
      phone,
    },
    url: '/server/user/login',
  });
};

export const code = phone => {
  return Axios({
    method: 'post',
    data: {
      code: phone,
    },
    url: '/server/user/yan',
  });
};

export const setPassWord = values => {
  return Axios({
    method: 'post',
    data: {
      values,
    },
    url: '/server/user/setPassword',
  });
};

export const getUserInfoData = id => {
  return Axios({
    method: 'post',
    data: {
      id,
    },
    url: '/server/user/info',
  });
};

export const passwordLogin = value => {
  return Axios({
    method: 'post',
    data: {
      value,
    },
    url: '/server/user/password',
  });
};

export const gaiMing = value => {
  return Axios({
    method: 'post',
    data: {
      value,
    },
    url: '/server/user/name',
  });
};

export const resetLoginPassword = value => {
  return Axios({
    method: 'post',
    data: {
      value,
    },
    url: '/server/user/resetPassword',
  });
};

export const uploadfile = file => {
  return Axios({
    method: 'post',
    data: {
      file,
    },
    url: '/server/user/uploadfile',
  });
};
