import Axios from 'axios';

export const getDianZan = id => {
  return Axios({
    method: 'post',
    data: {
      id,
    },
    url: '/server/hot/zan',
  });
};

export const getPingLun = data => {
  return Axios({
    method: 'post',
    data: {
      data,
    },
    url: '/server/hot/ping',
  });
};
