const Chroma = require("../util/chroma.js");

module.exports = class Effect {
  constructor(item, type, data) {
    this.item = item;
    this.type = type;
    this.data = data;
    this.createEffect();
  }

  // Apply the effect
  setEffect() {
    Chroma.setEffect(this.effect);
  }

  // Create the effect
  createEffect() {
    if (Chroma.isNotActive(true)) {
      return;
    }

    Chroma.createEffect(this.item, this.type, this.data).then((effect) => {
      setTimeout(() => {
        if (Chroma.isNotActive(true)) {
          return;
        }
        this.effect = effect;
        this.setEffect();
      }, 700);
    }).catch(console.error);
  }
};
