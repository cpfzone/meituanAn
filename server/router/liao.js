const code = require('koa-router')();
// 加载mongodb数据库
const model = require('../model');
const Meituan = model.getNames('meituan');
const dbName = require('../../config/db');
const koajwt = require('koa-jwt');
const secret = dbName.secret;

code.post('/add', koajwt({ secret }), async ctx => {
  const { value } = ctx.request.body;
  const id = value.name;
  const reg = new RegExp(value.value, 'i'); //不区分大小写
  let result = await Meituan.find(
    {
      $or: [
        //多条件，数组
        { name: { $regex: reg } },
        { phone: { $regex: reg } },
      ],
    },
    {},
  );
  let obj = result.filter(v => v.phone !== id);
  ctx.body = obj;
});

code.post('/tian', koajwt({ secret }), async ctx => {
  const { value } = ctx.request.body;
  const data = {
    dui: value.dui,
    que: false,
  };
  const result = await Meituan.updateOne({ _id: value.wo }, { $push: { haos: data } });
  ctx.body = result;
});

module.exports = code.routes();
