const config = require('./db');
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // ssr: true,
  routes: [
    //   以pages为根目录
    {
      path: '/',
      // 这里相对根目录,文件后缀名不能缺少
      title: '美团项目',
      component: '../layouts/index.js',
      routes: [
        {
          path: '/liao',
          title: '聊天交友',
          component: './liao/index.js',
        },
        {
          path: '/hot/detail/:id',
          title: '热门模块',
          component: './hot/detail',
        },
        {
          path: '/hot',
          title: '热门模块',
          component: './hot/index.js',
        },
        {
          path: '/account',
          title: '账号-个人页面',
          component: './account/index.js',
        },
        {
          path: '/account/myinfo',
          title: '修改用户信息',
          component: './account/myinfo',
        },
        {
          path: '/detail/:id/:index',
          title: '详情页面',
          component: './detail',
        },
        {
          path: '/account/chous',
          title: '订单',
          component: './account/chous',
        },
        {
          path: '/account/username',
          title: '订单',
          component: './account/username',
        },
        {
          path: '/order/:id/:index',
          title: '提交订单',
          component: './order',
        },
        {
          path: '/account/resetPass',
          title: '订单',
          component: './account/resetPass',
        },
        {
          path: '/account/avatar',
          title: '修改头像',
          component: './account/avatar',
        },
        {
          path: '/s/:id',
          title: '搜索详情页',
          component: './s',
        },
        {
          path: '/submit',
          title: '提交订单',
          component: './submit',
        },
        {
          path: '/setPass',
          title: '修改密码',
          component: './setPass',
        },
        {
          path: '/account/phone',
          title: '修改手机号',
          component: './account/phone',
        },
        {
          path: '/',
          title: '首页',
          component: './index.js',
        },
        {
          title: '搜索',
          path: '/search',
          component: './search/index',
        },
        {
          path: '/login',
          title: '手机美团登录',
          component: './login',
        },
        {
          title: '未找到相关信息',
          component: './NoFound',
        },
      ],
    },
    {
      title: '未找到相关信息',
      component: './NoFound',
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'meituanAn',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  theme: {
    'primary-color': '#FFBD00',
  },
  proxy: {
    '/server': {
      target: `http://localhost:${config.port}`,
      changeOrigin: true,
    },
    '/ptapi': {
      target: `https://www.meituan.com`,
      changeOrigin: true,
    },
  },
};
