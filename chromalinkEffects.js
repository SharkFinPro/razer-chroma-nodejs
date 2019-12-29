const Chroma = require("./chroma.js"),
    GlobalEffects = require("./globalEffects.js");

module.exports = {
    clear(effect) {
        return GlobalEffects.clear(effect);
    },
    setColor(color) {
        return GlobalEffects.setColor("chromalink", color);
    },
    off() {
        return GlobalEffects.off("chromalink");
    }
};
