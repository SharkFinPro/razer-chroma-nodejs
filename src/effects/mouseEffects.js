const Chroma = require("../lib/chroma.js"),
    GlobalEffects = require("./globalEffects.js");

module.exports = {
    clear(effect) {
        return clearInterval(effect);
    },
    setColor(color) {
        return GlobalEffects.setColor("mouse", color);
    },
    off() {
        return GlobalEffects.off("mouse");
    }
};
