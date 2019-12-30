const Effect = require("./effect.js");

module.exports = class ItemEffect {
  constructor(type) {
    this.type = type;
  }

  clear(effect) {
    if (typeof(effect) !== "object") {
      return console.error("Error: Cannot clear this effect type");
    }
    clearInterval(effect);
  }

  setEffect(effect, data) {
    this.effect = new Effect(this.type, effect, data);
  }

  setColor(color) {
    this.setEffect("CHROMA_STATIC", color);
  }

  off() {
    this.setEffect("CHROMA_NONE");
  }
};
