const Chroma = require("../util/chroma.js");

module.exports = class Effect {
  constructor(item, type, data) {
    this.item = item;
    this.type = type;
    this.data = data;
    this.set();
  }

  async set() {
    if (!Chroma.sessionid) {
      return;
    }

    await Chroma.createEffect(this.item, this.type, this.data).then((effect) => {
      setTimeout(() => {
        if (!Chroma.sessionid) {
          return;
        }
        this.effect = effect;
        Chroma.setEffect(effect);
      }, 700);
    }).catch(console.error);
  }
};
