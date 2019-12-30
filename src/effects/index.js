const ItemEffects = require("./itemEffects.js"),
  MousepadEffects = require("./mousepadEffects.js")

module.exports = {
  mouse: new ItemEffects("mouse"),
  mousepad: new MousepadEffects(),
  headset: new ItemEffects("headset"),
  keyboard: new ItemEffects("keyboard"),
  keypad: new ItemEffects("keypad"),
  chromalink: new ItemEffects("chromalink")
};
