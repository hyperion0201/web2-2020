export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      if (
        c.substring(name.length, c.length) &&
        c.substring(name.length, c.length) !== "null"
      ) {
        return decodeURIComponent(c.substring(name.length, c.length));
      }
    }
  }
  return null;
};

export const setCookie = (key, value, timeSet) => {
  let timeDefault = 1000 * 60 * 24 * 30 * 365;
  let timeEp = timeSet ? timeSet : timeDefault;
  let expires = new Date();
  expires.setTime(expires.getTime() + timeEp);
  document.cookie =
    key +
    "=" +
    encodeURIComponent(value) +
    ";expires=" +
    expires.toUTCString() +
    ";path=/;";
};

export const removeCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const isLogin = () => {
  return getCookie("user_token");
}