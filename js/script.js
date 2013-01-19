(function(a,b){
	
	var canvas = a.querySelector("#draw"),
	ctx = canvas.getContext("2d"),
	vendors = ["Webkit","Moz","O","ms"],
	distanceBetween = 20,
	lines = Math.floor(b.innerWidth/distanceBetween),
	controls = {
		size : 120,
		speed : 0.010,
		rotate : 0
	};

	var deg = {
		y1 : 90,
		y2 : 270
	};

	b.addEventListener("resize", reset, false);

		function reset(){
			canvas.width = b.innerWidth;
			canvas.height = b.innerHeight;
		}
		reset();
	
		function init(){

			for(var i = 0; i < vendors.length; i++){
				canvas.style[vendors[i]+"Transform"] = "rotate(-"+ controls.rotate +"deg)";
			}

			ctx.clearRect(0,0,b.innerWidth,b.innerHeight);

			for(var i = 1; i < lines; i++){
				linesDraw(i);
			}

			requestAnimFrame(init);
		}

		function linesDraw(i){
			deg.y1 += controls.speed;
			deg.y2 += controls.speed;

			var positionTop = (i*18+(deg.y1*Math.PI))/180,
			positionBottom = (i*18+(deg.y2*Math.PI))/180,
			centerY = b.innerHeight/2,
			lineTop = (Math.sin(positionTop))*controls.size+centerY,
			lineBottom = (Math.sin(positionBottom))*controls.size+centerY;

			ctx.lineWidth = 10;

			ctx.beginPath();
			ctx.moveTo(distanceBetween*i,lineTop);
			ctx.lineTo(distanceBetween*i,lineBottom);
			ctx.stroke();
		}

		var data = new dat.GUI();

		data.add(controls,"size").min(10).max(300).step(1);
		data.add(controls,"speed").min(0).max(0.1).step(0.001);
		data.add(controls,"rotate").min(0).max(360).step(1);

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