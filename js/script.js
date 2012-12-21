(function(a,b){
	var canvas = a.querySelector("#draw"),
	ctx = canvas.getContext("2d"),
	open = a.querySelector(".open"),
	close = a.querySelector(".close"),
	controls = a.querySelector(".controls"),
	setControl,
	size,
	speed,
	vendors = ["webkit","moz","o","ms"],
	rotate;

	var distanceBetween = 20, 
	lines = Math.floor(b.innerWidth/distanceBetween),
	deg = {
		y1 : 90,
		y2 : 270
	};

	b.addEventListener("resize",reset,false);
	a.addEventListener("click",toggle,false);


		function reset(){
			canvas.width = b.innerWidth;
			canvas.height = b.innerHeight;
		}
		reset();

		function toggle(event){
			if(event.target == open){
				controls.style.display = "block";
				setTimeout(function(){
					controls.classList.add("active");
				},0);
			}
			else if(event.target == close){
				controls.classList.remove("active");
				setTimeout(function(){
					controls.style.display = "none";
				},700);
			}
		}
	
		function init(){
			size = a.querySelector("#size").value*3;
			speed = a.querySelector("#speed").value/1000;
			rotate = a.querySelector("#rotate").value*1.8;

			for(var i = 0; i < vendors.length; i++){
				canvas.style[vendors[i]+"Transform"] = "rotate(-"+ rotate +"deg)";
			}

			ctx.clearRect(0,0,b.innerWidth,b.innerHeight);

			for(var i = 1; i < lines; i++){
				linesDraw(i);
			}

			requestAnimFrame(init);
		}

		function linesDraw(i){
			deg.y1 += speed;
			deg.y2 += speed;

			var positionTop = (i*18+(deg.y1*Math.PI))/180,
			positionBottom = (i*18+(deg.y2*Math.PI))/180,
			centerY = b.innerHeight/2,
			lineTop = (Math.sin(positionTop))*size+centerY,
			lineBottom = (Math.sin(positionBottom))*size+centerY;

			ctx.lineWidth = 10;

			ctx.beginPath();
			ctx.moveTo(distanceBetween*i,lineTop);
			ctx.lineTo(distanceBetween*i,lineBottom);
			ctx.stroke();
		}

		b.requestAnimFrame = (function(){
				  return  b.requestAnimationFrame       || 
				          b.webkitRequestAnimationFrame || 
				          b.mozRequestAnimationFrame    || 
				          b.oRequestAnimationFrame      || 
				          b.msRequestAnimationFrame     || 
				          function(/* function*/  callback, /* DOMElement*/ element){
				            b.setTimeout(callback, 1000/60);
				          };
		})();

		init();

})(document,this);