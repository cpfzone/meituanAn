const config = require('../config/db');
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

// 注册登录路由加载
router.use('/server/user', require('./router/user.js'));

// 加载所有路由
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

app.listen(config.port, () => {
  console.log(`服务器运行在${config.port}端口上`);
});
