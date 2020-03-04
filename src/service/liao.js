import Axios from 'axios';
// api
export const addUserLiao = value => {
  return Axios({
    method: 'post',
    data: {
      value,
    },
    url: '/server/liao/add',
  });
};

export const tianUserLiao = value => {
  return Axios({
    method: 'post',
    data: {
      value,
    },
    url: '/server/liao/tian',
  });
};

export const getFriendsList = value => {
  return Axios({
    method: 'post',
    data: {
      value,
    },
    url: '/server/liao/firends',
  });
};
