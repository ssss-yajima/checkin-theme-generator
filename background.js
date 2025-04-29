// --- p5.js Sketch Logic ---
let particles = [];
let canvas; // Define canvas variable

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("p5Canvas"); // index.html に <div id="p5Canvas"></div> があることを確認
	canvas.style("display", "block");

	for (let i = 0; i < 60; i++) {
		// Increased particle count slightly
		particles.push(new Particle());
	}
	colorMode(HSB, 360, 100, 100, 100);
	noStroke();
}

function draw() {
	background(210, 10, 15, 5); // Slightly bluish dark background for contrast

	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].display();
		if (particles[i].isOffScreen()) {
			particles.splice(i, 1);
			particles.push(new Particle());
		}
	}
}

class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		// Make particles move generally upwards or downwards for a calmer feel
		this.vel = createVector(
			random(-0.3, 0.3),
			random(0.5, 1.5) * (random() > 0.5 ? 1 : -1),
		);
		this.size = random(5, 30); // Slightly smaller max size
		this.baseHue = random(180, 280); // Cooler color range (blues, purples, pinks)
		this.hue = this.baseHue + random(-20, 20);
		this.saturation = random(50, 90);
		this.brightness = random(80, 100);
		this.alpha = random(20, 70); // Slightly lower max alpha
	}

	update() {
		this.pos.add(this.vel);
		// Add subtle horizontal drift
		this.pos.x += sin(frameCount * 0.02 + this.pos.y * 0.05) * 0.3;
		// Change hue slightly based on vertical position
		this.hue = (this.baseHue + this.pos.y * 0.05) % 360;
	}

	display() {
		fill(this.hue, this.saturation, this.brightness, this.alpha);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}

	isOffScreen() {
		return (
			this.pos.x < -this.size ||
			this.pos.x > width + this.size ||
			this.pos.y < -this.size ||
			this.pos.y > height + this.size
		);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	particles = [];
	for (let i = 0; i < 60; i++) {
		particles.push(new Particle());
	}
}
