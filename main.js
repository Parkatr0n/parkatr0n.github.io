
function randb(l, h) { return Math.floor(Math.random() * (h - l) + l); }
function rand(h) { return randb(0, h); }

var BG_COLOR;

//
function setup() {
	frameRate(60);
	createCanvas(600, 600);

	//
	BG_COLOR = color(30);

	background(BG_COLOR);

	// Spawn random factions
	loadPixels();
	var count = 30;

	for (var i = 0; i < count; i++) {
		var x = rand(width);
		var y = rand(height);

		var index = (x + y * width) * 4;

		pixels[index] = rand(256);
		pixels[index + 1] = rand(256);
		pixels[index + 2] = rand(256);
		pixels[index + 3] = 255;
	}
	updatePixels();
}

function randomColor() {
	return color(
		Math.floor(Math.random() * 255),
		Math.floor(Math.random() * 255),
		Math.floor(Math.random() * 255)
	);
}

function fillRandomPixels() {
	for (var i = 0; i < 4 * width * height; i += 4) {
		pixels[i] = Math.floor(Math.random() * 256);
		pixels[i + 1] = Math.floor(Math.random() * 256);
		pixels[i + 2] = Math.floor(Math.random() * 256);
		pixels[i + 3] = Math.floor(Math.random() * 256);
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
		pixels[i],
		pixels[i + 1],
		pixels[i + 2],
		pixels[i + 3]
	);
}

//
function draw() {
	loadPixels();

	// Tick loop
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			if (pixels[(x + y * width) * 4] == red(BG_COLOR)) continue;

			var i = (x + y * width) * 4;

			var c = color(
				pixels[i],
				pixels[i + 1],
				pixels[i + 2],
				pixels[i + 3]
			);

			var moveX = randomMoveDir();
			var moveY = randomMoveDir();

			var cloneX = clamp(x + moveX, 0, width - 1);
			var cloneY = clamp(y + moveY, 0, height - 1);

			var cloneIndex = (cloneX + (cloneY * width)) * 4;

			pixels[cloneIndex]     = red(c);
			pixels[cloneIndex + 1] = green(c);
			pixels[cloneIndex + 2] = blue(c);
			pixels[cloneIndex + 3] = alpha(c);
		}
	}

	updatePixels();
}
