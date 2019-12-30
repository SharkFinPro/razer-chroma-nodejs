const Effect = require("./effect.js");

module.exports = class ItemEffect {
  constructor(type) {
    this.type = type;
  }

  clear(effect) {
    if (typeof(effect) !== "object") {
      return console.error("Error: Cannot clear this effect type");
    }
    return clearInterval(effect);
  }

  setColor(color) {
    const effect = new Effect(this.type, "CHROMA_STATIC", color);
  }

  off() {
    const effect = new Effect(this.type, "CHROMA_NONE");
  }
};
