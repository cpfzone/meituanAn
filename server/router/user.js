const code = require('koa-router')();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const koajwt = require('koa-jwt');
// 加载mongodb数据库
const dbName = require('../../config/db');
const model = require('../model');
const Meituan = model.getNames('meituan');
const hashCode = require('../utils/hasCode'); // 密码加盐
// 这个是我个人的一个验证码平台,资金有限,如果大家使用尽量就是用来自己测试,不要随意使用,短信低于一定数量之后我会停掉这个接口
const PHONECODE = '80a1580da2040d43e6aa990d78a203d1';
const secret = dbName.secret;
/* params
   	将value替换成你发送的内容，
    如：content={"code":"测试0"}
    mobile 改为 发送的手机号
*/
// 获取验证码
code.get('/phone', async (ctx, next) => {
  const params = ctx.query;
  // 进行url编码转换
  const content = encodeURI(
    `你好,你的验证码是${params.code},欢迎你来到全栈练习项目美团,请在30分钟内完成验证`,
  );
  const result = await axios.get(
    `http://api.sms.cn/sms/?ac=send&uid=sunhang&pwd=${PHONECODE}&mobile=${params.phone}&content=${content}`,
  );
  ctx.cookies.set('code', params.code, {
    maxAge: 30 * 60 * 1000, // cookie有效时长
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: true, // 是否允许重写
  });
  ctx.body = result.data;
});

// 修改密码
code.post('/setPassword', koajwt({ secret }), async ctx => {
  const values = ctx.request.body.values;
  let result = {};
  const obj = await Meituan.findOne({ phone: values.phone });
  // 获取盐
  const salt = obj.salt;
  const newPassword = hashCode(values.password, salt);
  const a = await Meituan.updateOne(
    { phone: values.phone },
    { $set: { password: newPassword.passwordHash, firstPas: true } },
  );
  if (a.n == 1) {
    result.code = 1;
    result.message = '密码修改成功';
  } else {
    result.code = 2;
    result.message = '密码修改失败';
  }
  ctx.body = JSON.stringify(result);
});

// 判断验证码是否正确 并且注册
code.post('/yan', async ctx => {
  if (ctx.cookies.get('code') === ctx.request.body.code.code) {
    let result = {};
    // 操作数据库
    const createTime = new Date().getTime();
    const newPassword = hashCode(ctx.request.body.code.tel);
    // 注册数据库模型
    const userModel = new Meituan({
      createTime,
      password: newPassword.passwordHash,
      phone: ctx.request.body.code.tel,
      name: ctx.request.body.code.tel,
      salt: newPassword.salt,
      firstPas: false,
      level: 1,
      collections: ['123'],
      quans: ['12', '34', '56'],
      chous: [],
    });
    try {
      let obj = await userModel.save();
      let gai = {};
      obj.password = '';
      gai.yy = obj._id;
      result.userinfo = gai;
      result.biao = obj;
      result.code = 1;
      // 生成加密token
      const token = jwt.sign(
        {
          name: obj.name,
        },
        secret,
        { expiresIn: '2h' },
      );
      result.token = token;
    } catch (err) {
      result = { code: 2, message: '服务器发生了错误' };
    }
    ctx.body = JSON.stringify(result);
  } else {
    ctx.body = JSON.stringify({
      code: 3,
      message: '验证码填写错误,请重新查看或者重新获取',
    });
  }
});

// 获取用户基本信息
// 判断验证码是否正确 并且注册
code.post('/info', koajwt({ secret }), async ctx => {
  const data = ctx.request.body;
  const obj = await Meituan.findById(data.id);
  obj.password = '';
  ctx.body = JSON.stringify(obj);
});

module.exports = code.routes();
