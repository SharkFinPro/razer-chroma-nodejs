const Chroma = require("../lib/chroma.js");

module.exports = {
  clear(effect) {
    return clearInterval(effect);
  },
  setColor(type, color) {
    return setInterval(async () => {
      if (!Chroma.sessionid) {
        return;
      }
      await Chroma.createEffect(type, "CHROMA_STATIC", color).then((effect) => {
        Chroma.setEffect(effect);
      }).catch(console.error);
    }, 50);
  },
  off(type) {
    return setInterval(async () => {
      if (!Chroma.sessionid) {
        return;
      }
      await Chroma.createEffect(type, "CHROMA_NONE").then((effect) => {
        Chroma.setEffect(effect);
      }).catch(console.error);
    }, 50);
  }
};
