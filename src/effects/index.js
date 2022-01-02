const DeviceEffects = require("./deviceEffects.js"),
  MousepadEffects = require("./mousepadEffects.js"),
  KeyboardEffects = require("./keyboardEffects.js");

module.exports = {
  mouse: new DeviceEffects("mouse"),
  mousepad: new MousepadEffects(),
  headset: new DeviceEffects("headset"),
  keyboard: new KeyboardEffects(),
  keypad: new DeviceEffects("keypad"),
  chromalink: new DeviceEffects("chromalink"),
  all: new DeviceEffects(["mouse", "mousepad", "headset", "keyboard", "keypad", "chromalink"]),
};
