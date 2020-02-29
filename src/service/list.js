import Axios from 'axios';
// api
export const getListData = () => {
  return Axios({
    method: 'get',
    url: '/server/user/tags',
  });
};

export const getDetailListLi = value => {
  return Axios({
    method: 'get',
    url: '/server/user/detail',
    params: {
      id: value,
    },
  });
};

export const getDataSuggest = value => {
  return Axios({
    method: 'get',
    url: '/ptapi/suggest',
    params: {
      keyword: value,
    },
  });
};

export const putHotData = () => {
  return Axios({
    method: 'get',
    url: '/server/user/hot',
  });
};
