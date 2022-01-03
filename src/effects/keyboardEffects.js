const ItemEffects = require("./deviceEffects.js"),
  Chroma = require("../util/chroma.js"),
  ColorCell = require("../util/colorCell.js");

module.exports = class KeyboardEffects extends ItemEffects {
  constructor() {
    super("keyboard");

    this.keyboardData = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    ];

    this.cellData = [];
  }

  getData() {
    return this.cellData;
  }

  // Highlight WASD & arrow keys in white, turn off all other lights
  gaming(color) {
    this.keyboardData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, color, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, color, color, color, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, color, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, color, color, color, 0, 0, 0, 0]
    ];

    this.setEffect("CHROMA_CUSTOM", this.keyboardData);
  }

  // Random lights for every key
  random() {
    this.keyboardData = [
      [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535],
      [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535],
      [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535],
      [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535],
      [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535],
      [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535]
    ];
    const effect = setInterval(() => {
      for (let i = 0; i < this.keyboardData.length; i++) {
        for (let j = 0; j < this.keyboardData[i].length; j++) {
          this.keyboardData[i][j] = Math.floor(Math.random() * (0xffffff + 1));
        }
      }
      this.setEffect("CHROMA_CUSTOM", this.keyboardData);
    }, 150);

    Chroma.effects[this.devices] = effect;
  }

  // Wave effect, smooth rainbow transitions
  wave(dir, speed) {
    this.cellData = [];

    // Load the cells up with rainbow colors at an interval
    let r = 255, g = 0, b = 0, count = 0;
    let values = this.keyboardData[0].length;
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
      for (let i = 0; i < this.keyboardData[0].length; i++) {
        this.cellData[i].cycle();
        for (let row of this.keyboardData) {
          row[i] = this.cellData[i].getColor();
        }
      }

      this.setEffect("CHROMA_CUSTOM", this.keyboardData);
    }, 5);

    Chroma.effects[this.devices] = effect;
  }
};
