/* eslint-disable no-useless-concat */
function deleteCookie() {
  document.cookie = 'x-auth-token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.replace('/login.html');
}
document.getElementById('logout').addEventListener('click', deleteCookie);
