import axios from 'axios';
import { Toast } from 'antd-mobile';
import { notification } from 'antd';

const codeMessage = {
  202: '一个请求已经进入后台排队（异步任务）。',
  401: '用户没有权限（用户名、密码错误）。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  500: '服务器发生错误，请检查服务器。',
};

//拦截请求
axios.interceptors.response.use(null, ({ response }) => {
  Toast.loading('加载中', 0);
  if (codeMessage[response.status]) {
    notification.error({
      message: `请求错误 ${response.status}: ${response.config.url}`,
      description: codeMessage[response.status]
    });
  }
  // eslint-disable-next-line no-undef
  return Promise.reject(err);
});

//拦截响应
axios.interceptors.response.use(function(config) {
  Toast.hide();
  return config;
});
