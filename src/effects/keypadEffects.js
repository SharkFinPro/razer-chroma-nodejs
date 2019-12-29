const Chroma = require("../lib/chroma.js"),
  GlobalEffects = require("./globalEffects.js");

module.exports = {
  clear(effect) {
    return GlobalEffects.clear(effect);
  },
  setColor(color) {
    return GlobalEffects.setColor("keypad", color);
  },
  off() {
    return GlobalEffects.off("keypad");
  }
};
