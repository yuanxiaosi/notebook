var log = require("./index.js");
log.Warn("123123")
function aa(cb) {
  log.Warn("123123")
  cb();
}

aa(function(){
  log.Warn("123123")
});
