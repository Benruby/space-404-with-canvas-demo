
var canvas = document.querySelector("canvas");
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;

canvas.width = pageWidth;
canvas.height = pageHeight;

var ctx = canvas.getContext('2d');

// //a star in the sky
function TwinklingStar(x,y,radius, twinkleSpeed) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.twinkleSpeed = twinkleSpeed;
}

TwinklingStar.prototype.draw = function() {
	ctx.beginPath();
	ctx.strokeStyle = "rgba(247, 247, 247, 0.3)";
	ctx.fillStyle = "rgba(247, 247, 247, 0.9)";
	ctx.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2, false);
	ctx.stroke();
	ctx.fill();
}

TwinklingStar.prototype.update = function() {
	
	if (this.radius >= 2 || this.radius <= 1) {
		this.twinkleSpeed = -this.twinkleSpeed;
	}

	this.radius = this.radius + this.twinkleSpeed;

	this.draw();
}

function ShootingStar(sx, sy, ex, ey, radius, speed) {
	this.speed = speed;
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.radius = radius;
}

ShootingStar.prototype.draw = function() {
	ctx.beginPath();
	ctx.strokeStyle = "rgb(247, 247, 247)";
	ctx.fillStyle = "rgb(247, 247, 247)";
	ctx.arc(this.sx, this.sy, Math.abs(this.radius), 0, Math.PI * 2, false);
	ctx.stroke();
	ctx.fill();
}

ShootingStar.prototype.update = function() {
	
	if ( this.sx < this.ex && this.sy < this.ey ) {
		this.sx = this.sx + this.speed;
		this.sy = this.sy + Math.random() * (15 - 3) + 3;
		this.draw();
	} else {
		return;
	}

}

function getRandomX() {
	return Math.random() * innerWidth;
}

function getRandomY() {
	return Math.random() * innerHeight;
}

function getRandomTwinlingSpeed() {
	return Math.random() * 0.03;
}

function getRandomRadius(maxRadiusValue) {
	return Math.random() * maxRadiusValue;
}

function resTextSize() {
	if (pageWidth > 500) {
		return pageWidth / 35;
	} else {
		return 12;
	}
}

function resEarthYposition() {
	if(pageHeight > 600) {
		return 450;
	} else {
		if (pageHeight < 350) {
			return 160;
		} else {
			return 350;
		}
		
	}
}

function resEarthXposition() {
	if(pageWidth < 420) {
		return 150;
	} else {
		return Math.abs(pageWidth - 500);
	}
}

var twinklingStarsArray = [];
var numberOfStars = 400;

for (var i = 0; i < numberOfStars; i++) {
	var x = getRandomX();
	var y = getRandomY();
	var twinklingSpeed = getRandomTwinlingSpeed();
	var radius = getRandomRadius(2);
	twinklingStarsArray.push(new TwinklingStar(x, y, radius, twinklingSpeed));	
}

//click on earth, navigate to home page, add stars
//and more
canvas.addEventListener('click', function(e){
	if ( e.clientX > resEarthXposition() &&
		e.clientX < resEarthXposition() + 180 &&
		e.clientY > resEarthYposition() &&
		e.clientY < resEarthYposition() + 180) 
	{
		window.location = "/";
	} else {
		//create a star where clicked
		twinklingStarsArray.push(new TwinklingStar(e.clientX, e.clientY, getRandomRadius(2), getRandomTwinlingSpeed()));
	}
})


	//create a shooting star
	
	var shootingStar = new ShootingStar();

	var shootInterval = setInterval(function(){
		var sx = Math.random() * ((innerWidth - 50) - 50) + 50;
		var sy = Math.random() * ((innerHeight - 50) - 50) + 50;
		var ex = Math.random() * ((innerWidth - 50) - sx) + sx;
		var ey = Math.random() * ((innerHeight - 50) - sy) + sy;
		var speed = Math.random() * (30 - 10) + 10;
		var radius = Math.random() * 2;

		shootingStar = new ShootingStar(sx, sy, ex, ey, radius, speed);
	}, 2000);


	function animateNightStar() {
		requestAnimationFrame(animateNightStar);

		ctx.clearRect(0, 0, pageWidth, pageHeight);

	//draw the night stars.
	for (var i = 0; i < twinklingStarsArray.length; i++) {
		twinklingStarsArray[i].update();
	}

	//draw shooting star
	shootingStar.update();

	//add text
	ctx.textBaseline="bottom";
	var textSize = "bold " + (resTextSize()) + "px Courier";
	ctx.font = textSize;

	ctx.fillText("YOU HAVE REACHED UNCHARTED TERRITORIES.",pageWidth / 15, pageHeight / 5);
	ctx.fillText("CLICK EARTH TO GO BACK HOME,", pageWidth / 15, pageHeight / 3);
	ctx.fillText("OR CLICK ON THE UNIVERSE TO ADD STARS!", pageWidth / 15, pageHeight / 2.5);

	//draw earth
	var image = document.getElementById('source');
	ctx.drawImage(image, resEarthXposition(), resEarthYposition(), 180, 180);

	//draw moon
	var moon = document.getElementById('moon');
	ctx.drawImage(moon,  500, 550, 50, 50);
}

animateNightStar();
