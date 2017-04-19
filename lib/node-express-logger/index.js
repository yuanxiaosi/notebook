var fs = require('fs');
var path = require('path');

var Logger = function(){
  this.logFilePath = "./log/";
  this.logFileName = "log.log";
  this.type = ['INFO', 'DEBUG', 'WARNING', 'ERROR', 'TRACE'];
}

Logger.prototype.config = function(data){
  this.logFilePath = data.logFilePath;
  this.logFileName = data.logFileName;
}

Logger.prototype.Info = function(){ this.log("Info", arguments); }
Logger.prototype.Debug = function(){ this.log("Debug", arguments); }
Logger.prototype.Warn = function(){ this.log("Warn", arguments); }
Logger.prototype.Error = function(){ this.log("Error", arguments); }
Logger.prototype.Trace = function(){ this.log("Trace", arguments); }

Logger.prototype.getPos = function(){
  var cwd = process.cwd() + '/';
  try {
    throw new Error();
  } catch(e) {
    var eMsg = e.stack.split('\n')[4];
    if(eMsg.indexOf('(') >= 0 || eMsg.indexOf(')') >= 0 ){
      var pos = eMsg.split('(')[1].split(')')[0].split(':');
    }else{
      var spLen = eMsg.split(' ').length;
      var pos = eMsg.split(' ')[spLen-1].split(':');
    }
    return ' [' + pos[0].replace(cwd, '') + ':' + pos[1] + ':' + pos[2] + '] ';
  }
}

Logger.prototype.getNowTime = function(){
  var nowDate = new Date();
  var nowDateObj = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth()+1,
    day: nowDate.getDate(),
    hour: nowDate.getHours(),
    minute: nowDate.getMinutes(),
    second: nowDate.getSeconds()
  }
  for (var i in nowDateObj){
    // if(i == 'year'){ continue; }
    if(parseInt(nowDateObj[i]) < 10){
      nowDateObj[i] = '0' + nowDateObj[i];
    }
  }

  return {
    nowDay: nowDateObj.year + nowDateObj.month + nowDateObj.day,
    nowTime: nowDateObj.year + '-' + nowDateObj.month + '-' + nowDateObj.day + " " + nowDateObj.hour + ':' + nowDateObj.minute + ':' + nowDateObj.second + ' '
  }
}

Logger.prototype.log = function(type, arguments){
  var msg = "";
  for(var i in arguments){
    var res = JSON.stringify(arguments[i]);
    res += "--";
    msg += res;
  }
  var nowTime = this.getNowTime().nowTime;
  var nowDay = this.getNowTime().nowDay;
  var msgType = "[" + type + "]";
  var pos = this.getPos(); 
  var w_data = nowTime + msgType + pos + msg + '\r\n\r\n';
  var w_data = new Buffer(w_data);
  var url = this.logFilePath + this.logFileName + '_' + nowDay;
  
  if(!fs.existsSync(this.logFilePath)){
    fs.mkdirSync(this.logFilePath)
  }
  fs.writeFile(url, w_data, {flag: 'a'}, function (err) {
    if(err) {
      console.log(this.logFileName + '_' + nowDay +'写入失败');
    }
  });
}

module.exports = new Logger();