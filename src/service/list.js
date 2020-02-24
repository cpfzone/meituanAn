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
