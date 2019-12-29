const Chroma = require("./chroma.js");

module.exports = {
    clear(effect) {
        return clearInterval(effect);
    },
    setColor(type, color) {
        return setInterval(async () => {
            await Chroma.createEffect(type, "CHROMA_STATIC", color).then((effect) => {
                Chroma.setEffect(effect);
            });
        }, 50);
    },
    off(type) {
        return setInterval(async () => {
            await Chroma.createEffect(type, "CHROMA_NONE").then((effect) => {
                Chroma.setEffect(effect);
            });
        }, 50);
    }
};
