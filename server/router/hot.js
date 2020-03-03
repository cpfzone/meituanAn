const code = require('koa-router')();
// 加载mongodb数据库
const model = require('../model');
const Hot = model.getNames('hot');
const dbName = require('../../config/db');
const koajwt = require('koa-jwt');
const secret = dbName.secret;

// 查看热门 一个
code.post('/zan', koajwt({ secret }), async ctx => {
  const data = ctx.request.body;
  const newAdds = {
    createTime: new Date().getTime(),
    author: data.id.id,
  };
  // 先检查是否点过赞
  const oldData = await Hot.findOne({ _id: data.id.item }, {});
  let flag = false;
  oldData.adds.forEach(v => {
    if (v.author == data.id.id) {
      flag = true;
    }
  });
  if (flag) {
    ctx.body = {
      n: 1,
    };
  } else {
    const obj = await Hot.updateOne({ _id: data.id.item }, { $push: { adds: newAdds } });
    ctx.body = obj;
  }
});

module.exports = code.routes();
