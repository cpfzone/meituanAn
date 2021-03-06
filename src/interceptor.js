import axios from 'axios';
import { Toast } from 'antd-mobile';
// import { notification } from 'antd';
// const codeMessage = {
//   202: '一个请求已经进入后台排队（异步任务）。',
//   401: '用户没有权限（用户名、密码错误）。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   500: '服务器发生错误，请检查服务器。',
// };

axios.interceptors.request.use(function(config) {
  // jwt添加header的token
  const token = localStorage.getItem('meituanToken');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  // 过滤掉热门模块和搜索模块
  if (config.url !== '/server/user/hot' && config.url !== '/ptapi/suggest') {
    Toast.loading('加载中', 0);
  }
  // eslint-disable-next-line no-undef
  return config;
});

//拦截响应
axios.interceptors.response.use(function(config) {
  Toast.hide();
  return config;
});
