module.exports = function(){
	var obj = {};
  
	if(!window.location.hash.split("?")[1]){
		return obj;
	}
  var len = window.location.search.length;
  var paramsStr = window.location.search.substr(1,len);
  var arr = paramsStr.split("&");
  for(var i=0; i<arr.length; i++){
    var newArr = arr[i].split('=');
    var k = newArr[0];
    var v = newArr[1];
    obj[k] = v;
  }
  return obj;
}