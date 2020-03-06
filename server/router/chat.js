const code = require('koa-router')();
// 加载mongodb数据库
const model = require('../model');
const Chat = model.getNames('Chat');
const dbName = require('../../config/db');
const koajwt = require('koa-jwt');
const Meituan = model.getNames('meituan');
const secret = dbName.secret;

code.post('/first', koajwt({ secret }), async ctx => {
  const { from, to } = ctx.request.body.value;
  const chatid = [from, to].sort().join('_');
  const obj = await Chat.find({ chatid });
  ctx.body = obj;
});

code.post('/avatar', koajwt({ secret }), async ctx => {
  const value = ctx.request.body;
  const fromDetail = await Meituan.findOne({ _id: value.value });
  ctx.body = fromDetail.avatar;
});

code.post('/initMessage', koajwt({ secret }), async ctx => {
  const value = await Chat.find();
  ctx.body = value;
});

module.exports = code.routes();
