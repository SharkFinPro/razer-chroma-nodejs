const Chroma = require("./chroma.js"),
    MousepadEffects = require("./mousepadEffects.js"),
    MouseEffects = require("./mouseEffects.js"),
    HeadsetEffects = require("./headsetEffects.js"),
    KeyboardEffects = require("./keyboardEffects.js"),
    KeypadEffects = require("./keypadEffects.js"),
    ChromalinkEffects = require("./chromalinkEffects.js");

// Initialize Chroma
Chroma.init(() => {
    console.log("Chroma Editing Started");

    // Create a wave effect on the mousepad
    const mousepadEffect = MousepadEffects.wave(0);

    // Set the mouse to green
    const mouseEffect = MouseEffects.setColor(0x00FF00);

    // Set the headset to blue
    const headsetEffect = HeadsetEffects.setColor(0xFF0000);

    // Set the keyboard to red
    const keyboardEffect = KeyboardEffects.setColor(0x0000FF);

    // Set the keypad to yellow
    const keypadEffect = KeypadEffects.setColor(0x00FFFF);

    // Set the chromalink device to white
    const chromalinkEffect = ChromalinkEffects.setColor(0xFFFFFF);

    // Clear all effects and close Chroma after 5 seconds
    setTimeout(() => {
        MousepadEffects.clear(mousepadEffect);
        MouseEffects.clear(mouseEffect);
        HeadsetEffects.clear(headsetEffect);
        KeyboardEffects.clear(keyboardEffect);
        KeypadEffects.clear(keypadEffect);
        ChromalinkEffects.clear(chromalinkEffect);
        Chroma.uninit(() => {
            console.log("Chroma Editing Stopped");
        });
    }, 5000);
});
