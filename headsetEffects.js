const Chroma = require("./chroma.js"),
    GlobalEffects = require("./globalEffects.js");

module.exports = {
    clear(effect) {
        return GlobalEffects.clear(effect);
    },
    setColor(color) {
        return GlobalEffects.setColor("headset", color);
    },
    off() {
        return GlobalEffects.off("headset");
    }
};
