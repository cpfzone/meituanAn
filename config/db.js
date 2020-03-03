module.exports = {
  port: 4001, // 后台启动的端口
  dbName: 'meituan', // 数据库名称
  secret: "it 's mySecret", //jwt秘钥
  complete: false, // 如果设置为ture,那么后台和数据库都会调用我在服务器端的数据,如果你想要自己去修改后台和数据库,那么只要改为false即可
};
