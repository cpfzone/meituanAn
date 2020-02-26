const result = {};
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      let lat = pos.coords.latitude,
        lng = pos.coords.longitude;
      // 获取到了用户当前位置的坐标
      alert(lng, lat);
    },
    error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          result.msg = '请打开手机定位，并允许获取当前位置';
          break;
        case error.POSITION_UNAVAILABLE:
          result.msg = '定位失败，请退出重试!';
          break;
        case error.TIMEOUT:
          result.msg = '获取位置超时，请退出重试!';
          break;
        default:
          result.msg = '获取定位失败！';
      }
    },
  );
} else {
  // 当前浏览器不支持定位服务
}
console.log(result);
