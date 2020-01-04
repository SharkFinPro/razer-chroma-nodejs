const Effect = require("./effect.js");

module.exports = class ItemEffect {
  constructor(type) {
    this.type = type;
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
    this.effect = new Effect(this.type, effect, data);
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
