(function(w){
  w.IScroll = function(id, cb){
    var self = this;
    id = id.substr(1, id.length);
    var wrapper = document.getElementById(id);
    var scroller = wrapper.querySelector(".scroller");
    var scrollerLi = scroller.getElementsByTagName('li');
    var scrollerLiLen = scrollerLi.length;
    var scrollerLiHeight = scrollerLi[0].clientHeight;

    var scrollerWidth = scroller.clientWidth;
    var scrollerHeight = scroller.clientHeight;
    var wrapperWidth = wrapper.clientWidth;
    var wrapperHeight = wrapper.clientHeight;
    var maxScrollY = wrapperHeight - scrollerHeight;
    var scrollerStyle = scroller.style;
    var startY = 0;
    var moveY = 0;
    var transY = 0;
    var startTime = 0;
    var moveTime = 0;
    var endTime = 0;
    var y = 0;

    var scrollerIndex = 2;
    scrollerLi[scrollerIndex].style.color = '#000';

    wrapper.addEventListener('touchstart', function(e){
      scrollerLi[scrollerIndex].style.color = '#ccc';
      startY = e.touches[0].clientY;
      startTime = new Date().getTime();
      scrollStart();
    })

    wrapper.addEventListener('touchmove', function(e){
      moveY = e.touches[0].clientY - startY;
      y = transY + moveY
      if(y>0 || y<maxScrollY){
        y = transY + moveY/5;
      }
      scrollMove(y)
    })

    wrapper.addEventListener('touchend', function(e){
      endTime = new Date().getTime();
      moveTime = endTime - startTime;
      var momenValue = false;
      if(moveTime < 300){
        momenValue = momentum(y, transY, moveTime, maxScrollY, wrapperHeight)
      }
      y = transY + moveY
      scrollEnd(y)
      if(momenValue){
        transEnd(momenValue)
        scrollEnd(momenValue.destination)
      }else{
        scrollBack()
      }
    })
    function scrollStart(){
      scrollerStyle.webkitTransitionDuration = "0ms";
    }
    function scrollMove(y){
      scrollerStyle.webkitTransform = "translateY("+y+"px)";
    }
    function scrollEnd(y){
      transY = y;
    }
    function transEnd(momenValue){
      scrollerStyle.webkitTransitionTimingFunction = "cubic-bezier(0.1, 0.57, 0.1, 1)";
      scrollerStyle.webkitTransitionDuration = momenValue.duration+"ms";
      scrollerStyle.webkitTransform = "translateY("+momenValue.destination+"px)";
      setTimeout(function(){
        scrollBack(); //超出回滚
      }, momenValue.duration)
      
    }
    function scrollBack(){
      if(transY > 0){
        scrollerIndex = 2;
        scrollerLi[scrollerIndex].style.color = '#000'
        scrollerStyle.webkitTransitionTimingFunction = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        scrollerStyle.webkitTransitionDuration = "500ms";
        scrollerStyle.webkitTransform = "translateY(0px)";
        transY = 0;
        cb()
        return;
      }
      if(transY < maxScrollY){
        scrollerIndex = scrollerLiLen-3;
        scrollerLi[scrollerIndex].style.color = '#000'
        scrollerStyle.webkitTransitionTimingFunction = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        scrollerStyle.webkitTransitionDuration = "500ms";
        scrollerStyle.webkitTransform = "translateY("+ maxScrollY +"px)";
        transY = maxScrollY;
        cb()
        return;
      }

      var mid = Math.round(transY/scrollerLiHeight);
      var index = Math.abs(mid);
      scrollerIndex = index+2
      scrollerLi[scrollerIndex].style.color = '#000'
      transY = mid*40;
      scrollerStyle.webkitTransitionTimingFunction = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      scrollerStyle.webkitTransitionDuration = "500ms";
      scrollerStyle.webkitTransform = "translateY("+ transY +"px)";
      cb()
    }
    function momentum(current, start, time, lowerMargin, wrapperSize, deceleration) {//吊炸天的计算，可惜不是我写的，我也看不懂%……&%……%￥%……￥%……￥%
      var distance = current - start,
        speed = Math.abs(distance) / time,
        destination,
        duration;

      deceleration = deceleration === undefined ? 0.0006 : deceleration; //摩擦因素

      destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );

      duration = speed / deceleration;

      if ( destination < lowerMargin ) {
        destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
      } else if ( destination > 0 ) {
        destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }

      return {
        destination: Math.round(destination),
        duration: duration
      };
    };
  }

})(window)