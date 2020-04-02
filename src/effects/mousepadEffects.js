const ItemEffects = require("./itemEffects.js");

module.exports = class MousepadEffects extends ItemEffects {
  constructor() {
    super("mousepad");
  }

  // Create wave effect going around mousepad (only for firefly V1 as v2 has 20 lighting zones not 15)
  wave(dir) {
    const colors = [0XFF0000, 0XFF0000, 0XFF7F00, 0XFF7F00, 0XFFFF00, 0XFFFF00, 0X00FF00, 0X00FF00, 0X0000FF, 0X0000FF, 0X2E2B5F, 0X2E2B5F, 0X8B00FF, 0X8B00FF, 0XFF0000];
    if (dir === 0) {
      return setInterval(() => {
        colors.unshift([]);
        colors[0] = colors[15];
        colors.pop();
        this.setEffect("CHROMA_CUSTOM", colors);
      }, 50);
    }
    return setInterval(() => {
      colors.push(colors[0]);
      colors.shift();
      this.setEffect("CHROMA_CUSTOM", colors);
    }, 50);
  }
};
