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
  // 查询到发送者头像和接受者头像
  const fromDetail = await Meituan.findOne({ _id: from });
  const toDetail = await Meituan.findOne({ _id: to });
  obj.fromDetail = fromDetail.avatar;
  obj.toDetail = toDetail.avatar;
  ctx.body = obj;
});

module.exports = code.routes();
