const Effect = require("./effect.js");

module.exports = class ItemEffect {
  constructor(device) {
    if (typeof(device) === "string") {
      this.devices = [device];
    } else {
      this.devices = device;
    }
  }

  // Clear effect interval for looped effects
  clear(effect) {
    if (typeof(effect) !== "object") {
      return console.error(new Error("Cannot clear this effect type"));
    }
    clearInterval(effect);
  }

  // Apply Effect
  setEffect(effect, data) {
    for (let i = 0; i < this.devices.length; i++) {
      this.effect = new Effect(this.devices[i], effect, data);
    }
  }

  // Set RGBs as single color
  setColor(color) {
    this.setEffect("CHROMA_STATIC", color);
  }

  // Turn RGBs off
  off() {
    this.setEffect("CHROMA_NONE");
  }
};
