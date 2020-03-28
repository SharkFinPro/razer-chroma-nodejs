const Effect = require("./effect.js");

module.exports = class AllEffects {
  // Apply Effect
  setEffect(effect, data) {
    this.effect = new Effect("mouse", effect, data);
    this.effect = new Effect("mousepad", effect, data);
    this.effect = new Effect("headset", effect, data);
    this.effect = new Effect("keyboard", effect, data);
    this.effect = new Effect("keypad", effect, data);
    this.effect = new Effect("chromalink", effect, data);
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
