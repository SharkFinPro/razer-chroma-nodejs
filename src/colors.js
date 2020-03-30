module.exports = {
  AQUA: 0xffff00,
  BLACK: 0x000000,
  BLUE: 0xff0000,
  FUCHSIA: 0xff00ff,
  GRAY: 0x808080,
  GREEN: 0x008000,
  LIME: 0x00ff00,
  MAROON: 0x000080,
  NAVY: 0x800000,
  OLIVE: 0x008080,
  PURPLE: 0x800080,
  RED: 0x0000ff,
  SILVER: 0xc0c0c0,
  TEAL: 0x808000,
  WHITE: 0xffffff,
  YELLOW: 0x00ffff,
  ORANGE: 0x00a5ff,
  rgb: (r, g, b) => {
    return (b << 16) + (g << 8) + r;
  }
};
