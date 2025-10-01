export const fontSetting = $state({
  size: 6,
  _color: "#000000",

  get color() {
    return this._color;
  },
  set color(color: string) {
    this._color = color.toUpperCase();
  },
});
