const ItemEffects = require("./itemEffects.js");

module.exports = class KeyboardEffects extends ItemEffects {
  constructor() {
    super("keyboard");
  }

  // Highlight WASD & arrow keys in white, turn off all other lights
  gaming() {
    let param = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0xFFFFFF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xFFFFFF, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF, 0, 0, 0, 0]
    ];

    this.setEffect("CHROMA_CUSTOM", param);
  }

  // Random lights for every key
  random() {
    let param = {
      "color":[
        [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535, 65535, 65535],
        [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535, 65535, 65535],
        [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535, 65535, 65535],
        [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535, 65535, 65535],
        [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535, 65535, 65535],
        [255, 255, 255, 255, 255, 65280, 65280, 65280, 65280, 65280, 16711680, 16711680, 16711680, 16711680, 16711680, 16776960, 16776960, 16776960, 65535, 65535, 65535, 65535, 65535, 65535]
      ],
      "key":[
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    };
    return setInterval(() => {
      for (let i = 0; i < param.color.length; i++) {
        for (let j = 0; j < param.color[i].length; j++) {
          param.color[i][j] = Math.floor(Math.random() * (0xffffff + 1));
        }
      }
      this.setEffect("CHROMA_CUSTOM_KEY", param);
    }, 150);
  }
};
