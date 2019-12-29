const Chroma = require("../lib/chroma.js"),
  GlobalEffects = require("./globalEffects.js");

module.exports = {
  GlobalEffects: GlobalEffects,
  MouseEffects: {
    clear: GlobalEffects.clear,
    setColor(color) {
      return GlobalEffects.setColor("mouse", color);
    },
    off() {
      return GlobalEffects.off("mouse");
    }
  },
  MousepadEffects: {
    clear: GlobalEffects.clear,
    wave(dir) {
      const data = [];
      data[14] = 0XFF0000;
      data[13] = 0XFF0000;
      data[12] = 0XFF7F00;
      data[11] = 0XFF7F00;
      data[10] = 0XFFFF00;
      data[9] = 0XFFFF00;
      data[8] = 0X00FF00;
      data[7] = 0X00FF00;
      data[6] = 0X0000FF;
      data[5] = 0X0000FF;
      data[4] = 0X2E2B5F;
      data[3] = 0X2E2B5F;
      data[2] = 0X8B00FF;
      data[1] = 0X8B00FF;
      data[0] = 0XFF0000;
      return setInterval(async () => {
        if (dir === 0) {
          data.unshift([]);
          data[0] = data[15];
          data.pop();
        } else {
          data.push(data[0]);
          data.shift();
        }
        await Chroma.createEffect("mousepad", "CHROMA_CUSTOM", data).then((effect) => {
          Chroma.setEffect(effect);
        }).catch(console.error);
      }, 50);
    },
    setColor(color) {
      return GlobalEffects.setColor("mousepad", color);
    },
    off() {
      return GlobalEffects.off("mousepad");
    }
  },
  HeadsetEffects: {
    clear: GlobalEffects.clear,
    setColor(color) {
      return GlobalEffects.setColor("headset", color);
    },
    off() {
      return GlobalEffects.off("headset");
    }
  },
  KeyboardEffects: {
    clear: GlobalEffects.clear,
    setColor(color) {
      return GlobalEffects.setColor("keyboard", color);
    },
    off() {
      return GlobalEffects.off("keyboard");
    }
  },
  KeypadEffects: {
    clear: GlobalEffects.clear,
    setColor(color) {
      return GlobalEffects.setColor("keypad", color);
    },
    off() {
      return GlobalEffects.off("keypad");
    }
  },
  ChromalinkEffects: {
    clear: GlobalEffects.clear,
    setColor(color) {
      return GlobalEffects.setColor("chromalink", color);
    },
    off() {
      return GlobalEffects.off("chromalink");
    }
  }
};
