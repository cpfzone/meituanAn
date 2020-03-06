const fs = require('fs');
const path = require('path');
const model = require('./model');
const expression = model.getNames('expression');

const initEmoji = (filePath, objs) => {
  //根据文件路径读取文件，返回文件列表
  let files = fs.readdirSync(filePath); // 异步转同步
  //遍历读取到的文件列表
  files.forEach((filename, i) => {
    //获取当前文件的绝对路径
    let filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    let states = fs.statSync(filedir); // 异步转同步
    let isFile = states.isFile(); //是文件
    let isDir = states.isDirectory(); //是文件夹
    if (isFile) {
      if (filePath.slice(filePath.lastIndexOf('\\') + 1) === objs.name) {
        objs.list.push('@/assets/expression/' + objs.name + '/' + filename);
      }
      if (i === files.length - 1) {
        console.log(objs);
        let expre = new expression(objs);
        expre.save();
      }
    }
    if (isDir) {
      let obj = {
        name: filename,
        list: [],
        code: i + 1,
        info: filename,
      };
      initEmoji(filedir, obj); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
      // for (let k in obj) {
      //     let expre = new expression({
      //         name: k,
      //         list: obj[k]
      //     });
      //     expre.save();
      // }
    }
  });
};

initEmoji('../img/expression');
