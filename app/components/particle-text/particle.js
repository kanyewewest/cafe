class Particle {
  constructor(x, y, color, config) {
    this.x0 = x;
    this.y0 = y;
    this.x = x;
    this.y = y;
    this.color = color;
    this.config = config;
    this.size = this.config.gap;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 * 0.005;
  }
}
