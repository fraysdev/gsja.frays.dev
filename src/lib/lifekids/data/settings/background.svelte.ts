export const background = $state({
  backgroundImage: "",
  _overlayColor: "#000000",
  _overlayOpacity: 0,

  get image() {
    return this.backgroundImage;
  },
  set image(url) {
    this.backgroundImage = url;
  },
  get overlayColor() {
    return this._overlayColor;
  },
  set overlayColor(color: string) {
    this._overlayColor = color.toUpperCase();
  },
  getImageUrlStyle() {
    return this.backgroundImage && `url(${this.backgroundImage})`;
  },
  getOverlayRgba() {
    const r = parseInt(this._overlayColor.substring(1, 3), 16);
    const g = parseInt(this._overlayColor.substring(3, 5), 16);
    const b = parseInt(this._overlayColor.substring(5, 7), 16);
    return `rgba(${r},${g},${b},${this._overlayOpacity / 100})`;
  },
  setImageFile(file: File) {
    if (file && file.type.startsWith("image/")) {
      this.backgroundImage = URL.createObjectURL(file);
    }
  },
});
