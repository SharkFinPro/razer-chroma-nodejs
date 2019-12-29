const Chroma = require("./chroma.js"),
    MousepadEffects = require("./mousepadEffects.js"),
    MouseEffects = require("./mouseEffects.js"),
    HeadsetEffects = require("./headsetEffects.js");

// Initialize Chroma
Chroma.init(() => {
    console.log("Chroma Editing Started");

    // Create a wave effect on the mousepad
    const mousepadEffect = MousepadEffects.wave(0);

    // Set the mouse to green
    const mouseEffect = MouseEffects.setColor(0x00FF00);

    // Set the headset to blue
    const headsetEffect = HeadsetEffects.setColor(0xFF0000);

    // Clear all effects and close Chroma after 5 seconds
    setTimeout(() => {
        MousepadEffects.clear(mousepadEffect);
        MouseEffects.clear(mouseEffect);
        HeadsetEffects.clear(headsetEffect);
        Chroma.uninit(() => {
            console.log("Chroma Editing Stopped");
        });
    }, 5000);
});
