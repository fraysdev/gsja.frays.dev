export const doorprizeSetting = {
  starting: 1,
  ending: 999,

  get difference() {
    return this.ending - this.starting;
  },
};
