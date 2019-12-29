const Chroma = require("../src/index.js");

// Initialize Chroma
Chroma.util.init(() => {
  console.log("Chroma Editing Started");

  // Create a wave effect on the mousepad
  const mousepadEffect = Chroma.effects.MousepadEffects.wave(0);

  // Set the mouse to green
  const mouseEffect = Chroma.effects.MouseEffects.setColor(0x00FF00);

  // Set the headset to blue
  const headsetEffect = Chroma.effects.HeadsetEffects.setColor(0xFF0000);

  // Set the keyboard to red
  const keyboardEffect = Chroma.effects.KeyboardEffects.setColor(0x0000FF);

  // Set the keypad to yellow
  const keypadEffect = Chroma.effects.KeypadEffects.setColor(0x00FFFF);

  // Set the chromalink device to white
  const chromalinkEffect = Chroma.effects.ChromalinkEffects.setColor(0xFFFFFF);

  // Clear all effects and close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.effects.MousepadEffects.clear(mousepadEffect);
    Chroma.effects.MouseEffects.clear(mouseEffect);
    Chroma.effects.HeadsetEffects.clear(headsetEffect);
    Chroma.effects.KeyboardEffects.clear(keyboardEffect);
    Chroma.effects.KeypadEffects.clear(keypadEffect);
    Chroma.effects.ChromalinkEffects.clear(chromalinkEffect);
    Chroma.util.uninit(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
