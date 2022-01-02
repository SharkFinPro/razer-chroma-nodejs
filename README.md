# Razer Chroma Node.js

Razer Chroma Node.js allows you to control the lights on Razer Chroma devices using node.js

[![Npm Version](https://img.shields.io/npm/v/razer-chroma-nodejs.svg?maxAge=3600)](https://www.npmjs.com/package/razer-chroma-nodejs) [![Npm Downloads](https://img.shields.io/npm/dt/razer-chroma-nodejs.svg?maxAge=3600)](https://www.npmjs.com/package/razer-chroma-nodejs) [![Build Status](https://travis-ci.org/SharkFinPro/razer-chroma-nodejs.svg?branch=master)](https://travis-ci.org/SharkFinPro/razer-chroma-nodejs) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/87e642999aa543a989cd09d91d3d7973)](https://www.codacy.com/manual/SharkFinPro/razer-chroma-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SharkFinPro/razer-chroma-nodejs&amp;utm_campaign=Badge_Grade)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Razer Chroma node.js.

```bash
npm install razer-chroma-nodejs
```

## Usage

### Example

```javascript
const Chroma = require("razer-chroma-nodejs");

// Initialize Chroma
Chroma.util.init(() => {
  console.log("Chroma Editing Started");

  // Set the mouse color to green
  Chroma.effects.mouse.setColor(Chroma.colors.GREEN);

  // Close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.util.close(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
```

### Initialize & Close

`Chroma.util.init(callback);` Must be called to do anything with Chroma, Chroma is ready when callback is called.

`Chroma.util.close(callback);` Must be called to close Chroma. Chroma is closed when callback is called.

### Effects

**Colors**
- `Chroma.colors` List of pre defined Colors
- `Chroma.colors.rgb(r, g, b)` Use an RGB color

**Devices**
- `Chroma.effects.mouse` Mouse specific effects
- `Chroma.effects.mousepad` Mousepad specific effects
- `Chroma.effects.headset` Headset specific effects
- `Chroma.effects.keyboard` Keyboard specific effects
- `Chroma.effects.keypad` Keypad specific effects
- `Chroma.effects.chromalink` Chromalink specific effects
- `Chroma.effects.all` Effects for all devices

**All Devices**:
- `.setColor(color)` Change static color
- `.cycleSpectrum()` Cycle through the color spectrum. This is looped and needs to be cleared
- `.off()` Turn the lights off
- `.clear()` Clear non-static effects

**Mousepad**:
- `.wave(direction)` Create a wave effect around the mousepad (0 or 1 for direction). This is looped and needs to be cleared

**Keyboard**:
- `gaming` Sets WASD & arrow keys as white, turns off all other lights
- `random` Randomizes every key's color. This is looped and needs to be cleared

## License
[MIT](https://choosealicense.com/licenses/mit/)
