// Rain effect animation
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

// Resize canvas to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];
const numberOfRaindrops = 150; // Increased density of rain

// Raindrop class
class Raindrop {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1; // Smaller radius between 1 and 4 (for dots)
    this.speed = Math.random() * 2 + 1; // Slower rain (Speed between 1 and 3)
    this.opacity = Math.random() * 0.2 + 0.3; // Less opacity for a more subtle effect
    this.color = this.getRandomColor(); // Random color for each raindrop
  }

  // Function to randomly pick colors with reduced probability for purple
  getRandomColor() {
    const rand = Math.random();
    if (rand < 0.7) {
      return '#000000'; // 70% chance for black
    } else if (rand < 0.9) {
      return '#808080'; // 20% chance for grey
    } else {
      return '#800080'; // 10% chance for purple
    }
  }

  // Draw the raindrop (as a circle/dot) with a glow effect
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    
    // Glow effect
    ctx.shadowBlur = 10; // Set the blur amount for glow
    ctx.shadowColor = this.color; // Set the glow color to the raindrop's color

    ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(this.color.slice(3, 5), 16)}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
    ctx.fill();
    
    // Reset shadow properties to prevent them from affecting other elements
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(0, 0, 0, 0)'; // Reset shadow color to transparent
  }

  // Update position of the raindrop
  update() {
    if (this.y > canvas.height) {
      this.y = -this.radius; // Reset the raindrop to the top if it goes off the bottom
      this.x = Math.random() * canvas.width;
    }
    this.y += this.speed; // Move the raindrop down
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
