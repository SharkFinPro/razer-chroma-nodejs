const Chroma = require("../util/chroma.js");

module.exports = class Effect {
  constructor(device, type, data) {
    this.device = device;
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
    if (!Chroma.isActive()) {
      return;
    }

    Chroma.createEffect(this.device, this.type, this.data).then((effect) => {
      if (!Chroma.isActive()) {
        return;
      }
      this.effect = effect;
      this.setEffect();
    }).catch(console.error);
  }
};
