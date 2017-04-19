module.exports = function(playTime){
	let nowTime = new Date().getTime();
  playTime = playTime*1000;
  /*console.log(nowTime)
  console.log(playTime)*/
  let diff = nowTime-playTime;
  let month = diff/1000/60/60/24/30;
  let day = diff/1000/60/60/24;
  let house = diff/1000/60/60;
  let minute = diff/1000/60;
  let number;
  /*console.log("month:" +month)
  console.log("day:" +day)
  console.log("house:" +house)
  console.log("minute:" +minute)
  console.log("----------------------------")*/
  if(month > 1){
    number = Math.floor(month);
    return number+"个月前";
  }
  if(day > 1){
    number = Math.floor(day);
    return number+"天前";
  }
  if(house > 1){
    number = Math.floor(house);
    return number+"小时前";
  }
  if(minute > 0){
    number = Math.floor(minute);
    return number+"分钟前";
  }
  return "";
}