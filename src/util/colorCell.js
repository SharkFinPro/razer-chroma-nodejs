/* Cell data, used to store colors */
module.exports = class ColorCell {
  constructor(r, g, b, speed) {
    this.r = r;
    this.g = g;
    this.b = b;

    this.speed = speed || 3;
  }

  getColor() {
    return (this.b << 16) + (this.g << 8) + this.r;
  }

  cycle() {
    if (this.r > 0 && this.b <= 0) {
      this.r -= this.speed;
      this.g += this.speed;
    } else if (this.g > 0 && this.r <= 0) {
      this.g -= this.speed;
      this.b += this.speed;
    } else if (this.b > 0 && this.g <= 0) {
      this.r += this.speed;
      this.b -= this.speed;
    }

    if (this.r < 0) {
      this.r = 0;
    } else if (this.r > 255) {
      this.r = 255;
    }
    if (this.g < 0) {
      this.g = 0;
    } else if (this.g > 255) {
      this.g = 255;
    }
    if (this.b < 0) {
      this.b = 0;
    } else if (this.b > 255) {
      this.b = 255;
    }
  }
}
