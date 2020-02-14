const code = require("koa-router")();
const axios = require("axios");
const jwt = require("jsonwebtoken");
// 加载mongodb数据库
const model = require("../model");
const Meituan = model.getNames("meituan");
// 密码加盐
const hashCode = require("../utils/hasCode");
// 这个是我个人的一个验证码平台,资金有限,如果大家使用尽量就是用来自己测试,不要随意使用,短信低于一定数量之后我会停掉这个接口
const PHONECODE = "80a1580da2040d43e6aa990d78a203d1";

/* params
   	将value替换成你发送的内容，
    如：content={"code":"测试0"}
    mobile 改为 发送的手机号
*/
// 获取验证码
code.get("/phone", async (ctx, next) => {
  const params = ctx.query;
  // 进行url编码转换
  console.log(params)
  const content = encodeURI(
    `你好,你的验证码是${params.code},欢迎你来到全栈练习项目美团,请在30分钟内完成验证`
  );
  const result = await axios.get(
    `http://api.sms.cn/sms/?ac=send&uid=sunhang&pwd=${PHONECODE}&mobile=${params.phone}&content=${content}`
  );
  ctx.cookies.set("code", params.code, {
    maxAge: 30 * 60 * 1000, // cookie有效时长
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: true // 是否允许重写
  });
  ctx.body = result.data;
});

// 进行登录
code.post("/login", async ctx => {
  let postData = ctx.request.body;
  const obj = await Meituan.findOne({ phone: postData.phone });
  let result = {};
  if (obj) {
    const data = await Meituan.findOne({ _id: obj._id });
    const salt = data.salt;
    const newMiMa = hashCode(postData.password, salt);
    if (newMiMa.passwordHash === data.password) {
      data.password = ""; //保护密码不背查看到
      data.salt = "";
      result.userinfo = data;
      result.code = "1";
      // 生成加密token
      const token = jwt.sign(
        {
          name: data.name,
          _id: data._id
        },
        "sh",
        { expiresIn: "2h" }
      );
      result.token = token;
    } else {
      result = {
        code: 2,
        message: "密码不正确"
      };
    }
  } else {
    result = {
      code: 2,
      message: "手机号不存在"
    };
  }
  ctx.body = JSON.stringify(result);
});

module.exports = code.routes();
