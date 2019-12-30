const ItemEffects = require("./itemEffects.js");

module.exports = class MousepadEffects extends ItemEffects {
  constructor() {
    super("mousepad");
  }

  wave(dir) {
    const data = [];
    data[0] = 0XFF0000;
    data[1] = 0XFF0000;
    data[2] = 0XFF7F00;
    data[3] = 0XFF7F00;
    data[4] = 0XFFFF00;
    data[5] = 0XFFFF00;
    data[6] = 0X00FF00;
    data[7] = 0X00FF00;
    data[8] = 0X0000FF;
    data[9] = 0X0000FF;
    data[10] = 0X2E2B5F;
    data[11] = 0X2E2B5F;
    data[12] = 0X8B00FF;
    data[13] = 0X8B00FF;
    data[14] = 0XFF0000;
    return setInterval(() => {
      if (dir === 0) {
        data.unshift([]);
        data[0] = data[15];
        data.pop();
      } else {
        data.push(data[0]);
        data.shift();
      }
      this.setEffect("CHROMA_CUSTOM", data);
    }, 50);
  }
};
