import mockjs from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /api/tags': (req, res) => {
    setTimeout(() => {
      res.send(
        mockjs.mock({
          'list|20': [
            {
              city: '@city',
              'num|1000-30000': 50,
              'old|5-100.0-1': 0,
              'url|20000-30000': 20000,
              'new|10-1000.0-1': 0,
              pic: 'http://dummyimage.com/90x90',
              title: '@ctitle(3, 6)', // 中文标题(3到6个字)
              content: '@csentence(5, 8)', // 一段中文文本(8到12个字)
            },
          ],
        }),
      );
    }, 300);
  },
};
