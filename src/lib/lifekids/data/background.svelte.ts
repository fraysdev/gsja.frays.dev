let backgroundImage = $state("");

export const background = {
  get image() {
    return backgroundImage;
  },
  set image(url) {
    backgroundImage = url;
  },
  getImageUrlStyle() {
    return backgroundImage && `url(${backgroundImage})`;
  },
  setImageFile(file: File) {
    if (file && file.type.startsWith("image/")) {
      backgroundImage = URL.createObjectURL(file);
    }
  },
};
