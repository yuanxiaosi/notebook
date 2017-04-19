function isWechat () {
  return /MicroMessenger/.test(window.navigator.userAgent);
}

function isIOS () {
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

var options = {
  src: '/static/img/favicon.ico'
};

var title = function (name) {
  var body, iframe;
  document.title = name;
  if (isWechat() && isIOS()) {
    body = document.getElementsByTagName('body')[0];
    iframe = document.createElement('iframe');
    iframe.src = options.src;
    iframe.style.display = 'none';
    iframe.onload = function () {
      setTimeout(function () {
        body.removeChild(iframe);
        iframe = null;
      }, 0);
    };
    body.appendChild(iframe);
  }
}

title.source = function (src) {
  options.src = src;
};

module.exports = title;