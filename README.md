# Razer Chroma node.js

Razer Chroma node.js allows you to control the lights on Razer Chroma devices using node.js

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Razer Chroma node.js.

```bash
npm install razer-chroma-nodejs
```

## Usage

### Initialize/uninitialize

`Chroma.init(callback);`: Must be called to do anything with Chroma, Chroma is ready when callback is called.

`Chroma.uninit(callback);`: Must be called to close Chroma, all custom looped effects must be cleared before calling this. Chroma is closed when callback is called.


### Example

```javascript
const Chroma = require("../src/index.js");

// Initialize Chroma
Chroma.util.init(() => {
  console.log("Chroma Editing Started");

  // Set the mouse color to green
  const mouseEffect = Chroma.effects.mouse.setColor(0x00FF00);

  // Close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.util.uninit(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
```

## Effects

`Chroma.effects`

**All Devices**:
 - setColor(color): Change static color
 - off(): Turn the lights off
 - clear(): Clear custom looped effects

**Mousepad**:
 - wave(direction): Create a wave effect around the mousepad (0 or 1 for direction)

## License
[MIT](https://choosealicense.com/licenses/mit/)
