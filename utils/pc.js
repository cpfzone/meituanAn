export default function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

var flag = IsPC(); //true为PC端，false为手机端

if(flag){
  window.location.href = "http://mt.shtodream.cn/"
}else{
  window.location.href = "http://react.shtodream.cn/"
}