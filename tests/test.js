const Chroma = require("../src/index.js");

// Initialize Chroma
Chroma.util.init(() => {
  console.log("Chroma Editing Started");

  // Create a wave effect on the mousepad
  const mousepadEffect = Chroma.MousepadEffects.wave(0);

  // Set the mouse to green
  const mouseEffect = Chroma.MouseEffects.setColor(0x00FF00);

  // Set the headset to blue
  const headsetEffect = Chroma.HeadsetEffects.setColor(0xFF0000);

  // Set the keyboard to red
  const keyboardEffect = Chroma.KeyboardEffects.setColor(0x0000FF);

  // Set the keypad to yellow
  const keypadEffect = Chroma.KeypadEffects.setColor(0x00FFFF);

  // Set the chromalink device to white
  const chromalinkEffect = Chroma.ChromalinkEffects.setColor(0xFFFFFF);

  // Clear all effects and close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.MousepadEffects.clear(mousepadEffect);
    Chroma.MouseEffects.clear(mouseEffect);
    Chroma.HeadsetEffects.clear(headsetEffect);
    Chroma.KeyboardEffects.clear(keyboardEffect);
    Chroma.KeypadEffects.clear(keypadEffect);
    Chroma.ChromalinkEffects.clear(chromalinkEffect);
    Chroma.util.uninit(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
