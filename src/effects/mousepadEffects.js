const ItemEffects = require("./deviceEffects.js"),
  Chroma = require("../util/chroma.js"),
  ColorCell = require("../util/colorCell.js");

module.exports = class MousepadEffects extends ItemEffects {
  constructor() {
    super("mousepad");

    this.mouspadData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    this.cellData = [];
  }

  getData() {
    return this.cellData;
  }

  // Create wave effect going around mousepad (only for firefly V1 as v2 has 20 lighting zones not 15) (old version, non-smooth transitions)
  oldWave(dir) {
    this.mouspadData = [0XFF0000, 0XFF0000, 0XFF7F00, 0XFF7F00, 0XFFFF00, 0XFFFF00, 0X00FF00, 0X00FF00, 0X0000FF, 0X0000FF, 0X2E2B5F, 0X2E2B5F, 0X8B00FF, 0X8B00FF, 0XFF0000];
    let effect;
    if (dir === 0) {
      effect = setInterval(() => {
        this.mouspadData.unshift([]);
        this.mouspadData[0] = this.mouspadData[15];
        this.mouspadData.pop();
        this.setEffect("CHROMA_CUSTOM", this.mouspadData);
      }, 50);
    } else {
      effect = setInterval(() => {
        this.mouspadData.push(this.mouspadData[0]);
        this.mouspadData.shift();
        this.setEffect("CHROMA_CUSTOM", this.mouspadData);
      }, 50);
    }

    Chroma.effects[this.devices] = effect;
  }

  // Wave effect, smooth rainbow transitions
  wave(dir, speed) {
    this.cellData = [];

    // Load the cells up with rainbow colors at an interval
    let r = 255, g = 0, b = 0, count = 0;
    let values = this.mouspadData.length;
    do {
      if (count % ~~(765 / (values - 1)) === 0) {
        if (dir === 0) {
          this.cellData.unshift(new ColorCell(r, g, b, speed));
        } else {
           this.cellData.push(new ColorCell(r, g, b, speed));
        }
      }

      if (r > 0 && b === 0) {
        r--;
        g++;
      } else if (g > 0 && r === 0) {
        g--;
        b++;
      } else if (b > 0 && g === 0) {
        r++;
        b--;
      }

      count++;
    } while (r < 255);

    const effect = setInterval(() => {
      for (let i = 0; i < this.mouspadData.length; i++) {
        this.cellData[i].cycle();
        this.mouspadData[i] = this.cellData[i].getColor();
      }

      this.setEffect("CHROMA_CUSTOM", this.mouspadData);
    }, 5);

    Chroma.effects[this.devices] = effect;
  }
};
