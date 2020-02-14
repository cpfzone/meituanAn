import Axios from 'axios';
// api
export const getListData = () => {
  return Axios.get('http://mock.shtodream.cn/mock/5e439b1dbaf5c011f5fce6f9/api/tags');
};
