const Chroma = require("../src/index.js");

// Initialize Chroma
Chroma.util.init(() => {
  console.log("Chroma Editing Started");

  // Create a wave effect on the mousepad
  Chroma.effects.mousepad.wave(0);

  // Set the mouse to green
  Chroma.effects.mouse.setColor(Chroma.colors.GREEN);

  // Turn the headset off
  Chroma.effects.headset.off();

  // Randomize colors across the keyboard
  Chroma.effects.keyboard.random();

  // Set the keypad to yellow
  Chroma.effects.keypad.setColor(Chroma.colors.YELLOW);

  // Set the chromalink device to white
  Chroma.effects.chromalink.setColor(Chroma.colors.WHITE);

  // Clear all effects and close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.util.close(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
