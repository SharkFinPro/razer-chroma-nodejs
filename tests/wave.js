const Chroma = require("../src/index.js");

/* Create effect */
const waveEffect = () => {
  Chroma.effects.keyboard.wave(0);

  return setInterval(() => {
    const cellData = Chroma.effects.keyboard.getData();

    Chroma.effects.headset.setEffect("CHROMA_CUSTOM", [ cellData[0].getColor(), cellData[cellData.length - 1].getColor(), 0, 0, 0 ]);
    Chroma.effects.mouse.setColor(cellData[cellData.length - 1].getColor());
    Chroma.effects.mousepad.setColor(cellData[cellData.length - 1].getColor());
  }, 5);
};

// Load Chroma
Chroma.util.init(() => {
  let effect = waveEffect();

  setTimeout(() => {
    clearInterval(effect);
    Chroma.util.close();
  }, 10000);
});
