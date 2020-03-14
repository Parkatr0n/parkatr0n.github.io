
function randb(l, h) { return Math.floor(Math.random() * (h - l) + l); }
function rand(h) { return randb(0, h); }

var BG_COLOR;

// !!!
var PS;
var simwidth;
var simheight;
var scale;

//
function setup() {
	frameRate(1000);
	createCanvas(600, 600);

	scale = 3;
	simwidth = width / scale;
	simheight = height / scale;

	//
	PS = [];

	for (var i = 0; i < simwidth * simheight * 4; i += 4) {
		PS.push(30);
		PS.push(30);
		PS.push(30);
		PS.push(255);
	}

	//
	BG_COLOR = color(30);

	background(BG_COLOR);

	// Spawn random factions
	var count = 30;

	for (var i = 0; i < count; i++) {
		var x = rand(simwidth);
		var y = rand(simheight);

		var index = (x + y * simwidth) * 4;

		PS[index] = rand(256);
		PS[index + 1] = rand(256);
		PS[index + 2] = rand(256);
		PS[index + 3] = 255;
	}
}

function randomColor() {
	return color(
		Math.floor(Math.random() * 255),
		Math.floor(Math.random() * 255),
		Math.floor(Math.random() * 255)
	);
}

function fillRandomPixels() {
	for (var i = 0; i < 4 * simwidth * simheight; i += 4) {
		PS[i] = Math.floor(Math.random() * 256);
		PS[i + 1] = Math.floor(Math.random() * 256);
		PS[i + 2] = Math.floor(Math.random() * 256);
		PS[i + 3] = Math.floor(Math.random() * 256);
	}
}

function randomMoveDir() {
	var left  = rand(1000) < 500 ? -1 : 0;
	var right = rand(1000) < 500 ?  0 : 1;
	return left + right;
}

function clamp(val, min, max) {
	if (val < min) return min;
	if (val > max) return max;
	return val;
}

function pixelColor(i) {
	return color(
		PS[i],
		PS[i + 1],
		PS[i + 2],
		PS[i + 3]
	);
}

//
function draw() {
	// Tick loop
	for (var x = 0; x < simwidth; x++) {
		for (var y = 0; y < simheight; y++) {
			if (PS[(x + y * simwidth) * 4] == red(BG_COLOR)) continue;

			var i = (x + y * simwidth) * 4;

			var c = color(
				PS[i],
				PS[i + 1],
				PS[i + 2],
				PS[i + 3]
			);

			var moveX = randomMoveDir();
			var moveY = randomMoveDir();

			var cloneX = clamp(x + moveX, 0, simwidth - 1);
			var cloneY = clamp(y + moveY, 0, simheight - 1);

			var cloneIndex = (cloneX + (cloneY * simwidth)) * 4;

			PS[cloneIndex]     = red(c);
			PS[cloneIndex + 1] = green(c);
			PS[cloneIndex + 2] = blue(c);
			PS[cloneIndex + 3] = alpha(c);
		}
	}

	// TODO: Optimize rectangle drawing here
	// Maybe use scale*scale pixels[] calls instead
	for (var x = 0; x < simwidth; x++) {
		for (var y = 0; y < simheight; y++) {
			var i = (x + y * simwidth) * 4;

			var c = color(
				PS[i],
				PS[i + 1],
				PS[i + 2],
				PS[i + 3]
			);

			noStroke();
			fill(c);
			rect(x * 4, y * 4, 4, 4);
		}
	}
}
