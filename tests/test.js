const Chroma = require("../src/index.js");

// Initialize Chroma
Chroma.util.init(() => {
  console.log("Chroma Editing Started");

  // Create a wave effect on the mousepad
  const mousepadEffect = Chroma.effects.mousepad.wave(0);

  // Set the mouse to green
  const mouseEffect = Chroma.effects.mouse.setColor(0x00FF00);

  // Set the headset to blue
  const headsetEffect = Chroma.effects.headset.setColor(0xFF0000);

  // Set the keyboard to red
  const keyboardEffect = Chroma.effects.keyboard.setColor(0x0000FF);

  // Set the keypad to yellow
  const keypadEffect = Chroma.effects.keypad.setColor(0x00FFFF);

  // Set the chromalink device to white
  const chromalinkEffect = Chroma.effects.chromalink.setColor(0xFFFFFF);

  // Clear all effects and close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.effects.mousepad.clear(mousepadEffect);
    Chroma.effects.mouse.clear(mouseEffect);
    Chroma.effects.headset.clear(headsetEffect);
    Chroma.effects.keyboard.clear(keyboardEffect);
    Chroma.effects.keypad.clear(keypadEffect);
    Chroma.effects.chromalink.clear(chromalinkEffect);
    Chroma.util.uninit(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
