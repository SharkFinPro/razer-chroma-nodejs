const MouseEffects = require("./mouseEffects.js"),
  MousepadEffects = require("./mousepadEffects.js"),
  HeadsetEffects = require("./HeadsetEffects.js"),
  KeyboardEffects = require("./KeyboardEffects.js"),
  KeypadEffects = require("./KeypadEffects.js"),
  ChromalinkEffects = require("./ChromalinkEffects.js");

module.exports = {
  mouse: new MouseEffects(),
  mousepad: new MousepadEffects(),
  headset: new HeadsetEffects(),
  keyboard: new KeyboardEffects(),
  keypad: new KeypadEffects(),
  chromalink: new ChromalinkEffects()
};
