const Chroma = require("../util/chroma.js");

module.exports = class Effect {
  constructor(item, type, data) {
    this.item = item;
    this.type = type;
    this.data = data;
    this.createEffect();
  }

  setEffect() {
    Chroma.setEffect(this.effect);
  }

  createEffect() {
    if (!Chroma.sessionid) {
      return;
    }

    Chroma.createEffect(this.item, this.type, this.data).then((effect) => {
      setTimeout(() => {
        if (!Chroma.sessionid) {
          return;
        }
        this.effect = effect;
        this.setEffect();
      }, 700);
    }).catch(console.error);
  }
};
