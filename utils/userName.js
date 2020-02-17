export default function IsOK(str) {
  var ta = str.split(''),
    str_l = 0;
  var str_fa = Number(ta[0].charCodeAt());
  if ((str_fa >= 65 && str_fa <= 90) || (str_fa >= 97 && str_fa <= 122) || str_fa > 255) {
    for (var i = 0; i <= ta.length - 1; i++) {
      str_l++;
      if (ta[i] > 255) {
        str_l++;
      }
    }
    if (str_l >= 4 && str_l <= 16) {
      return true;
    }
  }
  return false;
}
