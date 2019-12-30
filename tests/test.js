const Chroma = require("../src/index.js");

// Initialize Chroma
Chroma.util.init(() => {
  console.log("Chroma Editing Started");

  // Create a wave effect on the mousepad
  const mousepadEffect = Chroma.effects.mousepad.wave(0);

  // Set the mouse to green
  Chroma.effects.mouse.setColor(0x00FF00);

  // Set the headset off
  Chroma.effects.headset.off();

  // Set the keyboard to red
  Chroma.effects.keyboard.setColor(0x0000FF);

  // Set the keypad to yellow
  Chroma.effects.keypad.setColor(0x00FFFF);

  // Set the chromalink device to white
  Chroma.effects.chromalink.setColor(0xFFFFFF);

  // Clear all effects and close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.effects.mousepad.clear(mousepadEffect);
    Chroma.util.uninit(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
