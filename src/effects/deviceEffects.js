const Effect = require("./effect.js");

module.exports = class ItemEffect {
  constructor(device) {
    if (typeof(device) === "string") {
      this.devices = [device];
    } else {
      this.devices = device;
    }
  }

  // Apply Effect
  setEffect(effect, data) {
    for (let i = 0; i < this.devices.length; i++) {
      this.effect = new Effect(this.devices[parseInt(i)], effect, data);
    }
  }

  // Set RGBs as single color
  setColor(color) {
    return setInterval(() => {
      this.setEffect("CHROMA_STATIC", color);
    }, 150);
  }

  // Cycle the color spectrum
  cycleSpectrum() {
    let r = 255, g = 0, b = 0;
    return setInterval(() => {
      if (r > 0 && b === 0) {
        r--;
        g++;
      }
      if (g > 0 && r === 0) {
        g--;
        b++;
      }
      if (b > 0 && g === 0) {
        r++;
        b--;
      }
      this.setEffect("CHROMA_STATIC", (b << 16) + (g << 8) + r);
    }, 15);
  }

  // Turn RGBs off
  off() {
    return setInterval(() => {
      this.setEffect("CHROMA_NONE");
    }, 150);
  }
};
