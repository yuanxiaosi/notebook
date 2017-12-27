(function(w){
	w.IScroll = function(id){
		var self = this;
		id = id.substr(1, id.length);
		var wrapper = document.getElementById(id);
		var scroller = document.getElementById("scroller");

		var scrollerWidth = scroller.clientWidth;
		var scrollerHeight = scroller.clientHeight;
		var wrapperWidth = wrapper.clientWidth;
		var wrapperHeight = wrapper.clientHeight;

		var maxScrollY = wrapperHeight - scrollerHeight;

		var scrollerStyle = scroller.style;

		var startY = 0;
		var moveY = 0;

		var transY = 0;
		var limitY = 0;

		var startTime = 0;
		var moveTime = 0;
		var endTime = 0;

		wrapper.addEventListener('touchstart', function(e){
			limitY = 0;
			startY = e.touches[0].clientY;
			startTime = new Date().getTime();
			scrollStart();
		})

		wrapper.addEventListener('touchmove', function(e){
			moveY = e.touches[0].clientY - startY;
			y = transY + moveY
			if(y>=0){
				if(limitY==0){
					limitY = moveY
				}
				y = 0 + (moveY-limitY)/4;
			}
			if(y<maxScrollY){
				if(limitY==0){
					limitY = moveY
				}
				y = maxScrollY + (moveY-limitY)/4;
			}
			scrollMove(y)
		})

		wrapper.addEventListener('touchend', function(e){
			endTime = new Date().getTime();
			moveTime = endTime - startTime;

			var momenValue = false;
			if(moveTime < 150){
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
			scrollerStyle.transitionDuration = "0ms";
		}
		function scrollMove(y){
			scrollerStyle.transform = "translateY("+y+"px)";
		}
		function scrollEnd(y){
			transY = y;
		}
		function transEnd(momenValue){
			scrollerStyle.transitionTimingFunction = "cubic-bezier(0.1, 0.57, 0.1, 1)";
			scrollerStyle.transitionDuration = momenValue.duration+"ms";
			scrollerStyle.transform = "translateY("+momenValue.destination+"px)";
			setTimeout(function(){
				scrollBack(); //超出回滚
			}, momenValue.duration)
			
		}
		function scrollBack(){
			if(transY > 0){
				scrollerStyle.transitionTimingFunction = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
				scrollerStyle.transitionDuration = "500ms";
				scrollerStyle.transform = "translateY(0px)";
				transY = 0;
			}
			if(transY < maxScrollY){
				scrollerStyle.transitionTimingFunction = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
				scrollerStyle.transitionDuration = "500ms";
				scrollerStyle.transform = "translateY("+ maxScrollY +"px)";
				transY = maxScrollY;
			}
		}


		function momentum(current, start, time, lowerMargin, wrapperSize, deceleration) {


			/*console.log(current)      //当前位置
			console.log(start)		    //开始位置
			console.log(time)			    //经历时间
			console.log(lowerMargin)  //最大滚动长度
			console.log(wrapperSize)	//屏幕高度
			console.log(deceleration)*/

			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination,
				duration;
				/*console.log(distance)
				console.log(time)
				console.log(speed)
				console.log("--------------------------------")*/

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