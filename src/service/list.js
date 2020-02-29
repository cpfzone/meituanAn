import Axios from 'axios';
// api
export const getListData = () => {
  return Axios({
    method: 'get',
    url: '/server/list/tags',
  });
};

export const getDetailListLi = value => {
  return Axios({
    method: 'get',
    url: '/server/list/detail',
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
    url: '/server/list/hot',
  });
};

export const putDetailHotData = id => {
  return Axios({
    method: 'get',
    url: '/server/list/detail',
    params: {
      id,
    },
  });
};
