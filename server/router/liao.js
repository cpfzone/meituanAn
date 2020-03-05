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
  // 发出者
  const data = {
    dui: value.dui,
    my: value.wo,
    que: 3, // 1 添加成功 2 代表验证 3 等待同意
  };
  // 收到者
  const data1 = {
    dui: value.wo,
    my: value.dui,
    que: 2, // 1 添加成功 2 代表验证 3 等待同意
  };
  const result = await Meituan.updateOne({ _id: value.dui }, { $push: { haos: data1 } });
  await Meituan.updateOne({ _id: value.wo }, { $push: { haos: data } });
  ctx.body = result;
});

code.post('/firends', koajwt({ secret }), async ctx => {
  const { value } = ctx.request.body;
  const obj = await Meituan.findById(value).then(res => {
    var promises = res.haos.map(async (v, index) => {
      const data = await Meituan.findOne({ _id: v.dui });
      data.password = v.que;
      return data;
    });
    return Promise.all(promises);
  });
  ctx.body = obj;
});

code.post('/tong', koajwt({ secret }), async ctx => {
  const { value } = ctx.request.body;
  // 双方的好友都需要修改一波
  const obj = await Meituan.updateOne(
    {
      _id: value.dui,
      'haos.my': value.dui,
    },
    {
      $set: {
        'haos.$.que': 1,
      },
    },
  );
  const obj1 = await Meituan.updateOne(
    {
      _id: value.id,
      'haos.dui': value.dui,
    },
    {
      $set: {
        'haos.$.que': 1,
      },
    },
  );
  ctx.body = obj;
});

module.exports = code.routes();
