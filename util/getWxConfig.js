import Wx from 'weixin-js-sdk'
import indexService from '../service/index.js'

let WxConfig = function(data){
  this.appId = data.appId;
  this.debug = data.debug == "true"?true:false;
  this.nonceStr = data.nonceStr;
  this.signature = data.signature;
  this.timestamp = data.timestamp;
  this.jsApiList = ["scanQRCode", "chooseWXPay"];
}

let wxConfig;

let ininWxConfig = function(){
  var data = {
    pathName: window.location.pathname,
    search: window.location.search
  }
  indexService.getWxConfig(data).then((res)=>{
    if(res.status == 0){
      wxConfig = new WxConfig(res.data)
      Wx.config(wxConfig);
    }else{
      alert(res.msg)
    }
  }).catch((err)=>{
    alert(err)
  })
}

exports.initWxConfig = ininWxConfig
exports.wx = Wx