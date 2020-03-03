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
