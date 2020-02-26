<div align="center">

# React-美团(Dva + umi + koa + Mongoose)

</div>

> **说明** <br/>
> 自己为何要去尝试写一个这么多页面的网页:100:,本人是纯粹的小白一枚,在各大论坛不停的刷着Vue,React,RN,微信小程序等方面的教程,虽然不停的学习,但是发现自己的技术并没有实质上的提高,就是不停的重复着同样的任务,每个地方都学到了一点,只要混合在一起,马上就全都不会了,:tada:所以第一次尝试使用最新的技术去制作一个大型网站---->至于为何选择了美团,主要是每次看的教程都是做**饿了么**,这次就打算做一个和饿了么类似的美团,数据的话用了美团官网的一部分API,自己写了一部分

[![Build Status](https://www.travis-ci.org/2662419405/meituan.svg?branch=master)](https://www.travis-ci.org/2662419405/meituan)

## 其余端支持

* 美团电脑网页 React + Koa + Mongoose <a href="https://github.com/2662419405/meituan">开发完毕</a> :tada:

* 美团手机网页 Dva + umi + koa + Mongoose <a href="https://github.com/2662419405/meituanAn">开发完毕</a> :100:

* 美团APP ReactNative + koa + Mongoose <a href="https://github.com/2662419405/meituanApp">正在开发</a>

* 微信小程序 Tora <a href="#">还未开发</a>

## 完成

- [x] 自动部署到服务器
- [x] umi + dva 基本使用
- [x] 配置axios拦截器
- [x] mock数据模拟
- [x] 首页基本完成
- [x] dva
- [x] umi
- [x] 页面登录
- [x] 页面注册
- [x] koa搭建后台
- [x] mongoose模拟数据
- [x] 根据路由修改title
- [x] 上传头像
- [x] 骨架屏
- [x] 基本页面已经完成 :tada:
- [x] 搜索功能完成 
- [x] 根据搜狐提供的api获取用户城市
- [x] 性能优化  图片预加载,页面滚动防抖

## 计划

- [ ] SSR服务端渲染 -> 原谅我太菜,看得我一脸懵逼
- [ ] 使用TS编写代码 

## 使用

> 需要本地有mongoose并且启动,有umi

```js
git clone https://github.com/2662419405/meituanAn.git
cd meituanAn && npm install
npm run server
umi dev
```

**如果想要build之后可以访问,推荐配置nginx,这里面附上我的nginx配置**

```yaml
 # 移动端美团
server {
    listen       80;

    server_name  react.shtodream.cn;
    location / {
        root   html/meituanAn/dist;
        index  index.html index.htm;
    }

    location /server {
        proxy_pass http://localhost:4001;  #这个地方需要和上面一致
    }
    
}
```

## 效果图

> 效果图只是针对于本手机和电脑,并不代表全部

<div>

![img/login.jpg](img/login.jpg)
![img/home.jpg](img/home.jpg)
![img/account.jpg](img/account.jpg)
![img/gujiaping.jpg](img/gujiaping.jpg)
![img/user.jpg](img/user.jpg)

</div>

## 后台api接口

|          请求地址          | 请求类型 |              请求参数               |                    说明                     | 获取数据是否需要Token |
| :------------------------: | :------: | :---------------------------------: | :-----------------------------------------: | :-------------------: |
|     /server/user/phone     |   get    |          ?phone=xx&code=yy          |               获取手机验证码                |          否           |
|  /server/user/setPassword  |   post   |   {values:{phone:xx,password:yy}}   |                 初始化密码                  |          是           |
|      /server/user/yan      |   post   |      {code:{code:xx,tel:xxx}}       | 判断验证码 并且进行注册，如果注册过，则登录 |          否           |
|     /server/user/info      |   post   |              {id:xxx}               |                获取用户信息                 |          是           |
|     /server/user/name      |   post   |     {value:{phone:xx,name:xx}}      |                 修改用户名                  |          是           |
| /server/user/resetPassword |   post   | {value:{yuanPassword:xxx,salt:xxx}} |                  修改密码                   |          是           |
|   /server/user/password    |   post   |   {value:{tel:xxx,password:xxx}}    |                通过密码登录                 |          否           |
|  /server/user/uploadfile   |   post   |                file                 |                获取上传文件                 |          是           |



## 配置

> /config/db.js

```js
module.exports = {
  port: 4001, // 后台启动的端口
  dbName: 'meituan', // 数据库名称
  secret: "it 's mySecret", //jwt秘钥
};
```