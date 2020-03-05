const config = require('../config/db');
const Koa = require('koa');
const router = require('koa-router')();
const koaBody = require('koa-body');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const model = require('./model');
const Chat = model.getNames('Chat');

// 聊天数据处理
io.on('connection', socket => {
  socket.on('sendMsg', async data => {
    const { from, to, value } = data;
    const create_time = new Date().getTime();
    const chatid = [from, to].sort().join('_');
    const obj = new Chat({ from, to, value, create_time, chatid });
    const result = await obj.save();
    io.emit('recvmsg', result);
  });
});

// 加载文件 使用 koa-body 代替 koa-bodyparser 和 koa-multer
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  }),
);

// 注册登录路由加载
router.use('/server/user', require('./router/user.js'));
router.use('/server/list', require('./router/list.js'));
router.use('/server/hot', require('./router/hot.js'));
router.use('/server/liao', require('./router/liao.js'));

// 加载所有路由
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());

server.listen(config.port, () => {
  console.log(`服务器运行在${config.port}端口上`);
});
