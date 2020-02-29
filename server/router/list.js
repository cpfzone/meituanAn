const code = require('koa-router')();
// 加载mongodb数据库
const model = require('../model');
const Hot = model.getNames('hot');
const Back = model.getNames('back');

// 查看热门 一个
code.get('/detail', async ctx => {
  const data = ctx.query.id;
  const obj = await Hot.findOne({ _id: data });
  ctx.body = obj;
});

// 查看热门 全部
code.get('/hot', async ctx => {
  const obj = await Hot.find({});
  ctx.body = obj;
});

// 查看首页 一个
code.get('/list', async ctx => {
  const data = ctx.query.id;
  const obj = await Back.findOne({ _id: data });
  ctx.body = obj;
});

// 查看首页 全部
code.get('/tags', async ctx => {
  const obj = await Back.find({});
  ctx.body = obj;
});

module.exports = code.routes();
