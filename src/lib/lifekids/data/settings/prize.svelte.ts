const _prizeRange = $state({ min: 1, max: 999 });
const _prizeDiffs = $derived(_prizeRange.max - _prizeRange.min);

export const prizeSetting = {
  get range() {
    return _prizeRange;
  },
  get rangeMin() {
    return _prizeRange.min;
  },
  get rangeMax() {
    return _prizeRange.max;
  },
  get diff() {
    return _prizeDiffs;
  },
  set rangeMin(min: number) {
    _prizeRange.min = min;
  },
  set rangeMax(max: number) {
    _prizeRange.max = max;
  },
};
