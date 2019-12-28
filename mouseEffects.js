const Chroma = require("./chroma.js");

module.exports = {
    clear(effect) {
        return clearInterval(effect);
    },
    setColor(color) {
        return setInterval(async () => {
            await Chroma.createEffect("mouse", "CHROMA_STATIC", color).then((effect) => {
                Chroma.setEffect(effect);
            });
        }, 50);
    },
    off() {
        return setInterval(async () => {
            await Chroma.createEffect("mouse", "CHROMA_NONE").then((effect) => {
                Chroma.setEffect(effect);
            });
        }, 50);
    }
};
