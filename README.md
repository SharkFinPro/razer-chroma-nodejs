# Razer Chroma node.js

Razer Chroma node.js allows you to control the lights on Razer Chroma devices using node.js

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
  const mouseEffect = Chroma.effects.mouse.setColor(Chroma.colors.GREEN);

  // Close Chroma after 5 seconds
  setTimeout(() => {
    Chroma.util.uninit(() => {
      console.log("Chroma Editing Stopped");
    });
  }, 5000);
});
```

### Initialize & uninitialize

`Chroma.util.init(callback);` Must be called to do anything with Chroma, Chroma is ready when callback is called.

`Chroma.util.uninit(callback);` Must be called to close Chroma, all custom looped effects must be cleared before calling this. Chroma is closed when callback is called.

### Effects

`Chroma.effects`

**All Devices**:
 - `.setColor(color)` Change static color
 - `.off()` Turn the lights off

**Mousepad**:
 - `.wave(direction)` Create a wave effect around the mousepad (0 or 1 for direction)

### Clear effects

`Chroma.effects.type.clear(effect)` Clear specified effect, must be a looped effect as static effects do not need to be cleared

## License
[MIT](https://choosealicense.com/licenses/mit/)
