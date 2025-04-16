// Rain effect animation
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Resize canvas to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];
const numberOfRaindrops = 100; // Control the density of the rain

// Raindrop class
class Raindrop {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 15 + 15; // Length of raindrop
    this.speed = Math.random() * 2 + 2; // Speed of the raindrop
    this.opacity = Math.random() * 0.3 + 0.2; // Random opacity
  }

  // Draw the raindrop
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Update position of the raindrop
  update() {
    if (this.y > canvas.height) {
      this.y = -this.length;
      this.x = Math.random() * canvas.width;
    }
    this.y += this.speed;
    this.draw();
  }
}

// Create raindrops and push to array
for (let i = 0; i < numberOfRaindrops; i++) {
  raindrops.push(new Raindrop());
}

// Animate rain effect
function animateRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  raindrops.forEach(drop => drop.update()); // Update all raindrops
  requestAnimationFrame(animateRain); // Loop the animation
}

animateRain();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
