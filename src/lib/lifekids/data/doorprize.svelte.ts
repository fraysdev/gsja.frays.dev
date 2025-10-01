import { doorprizeSetting } from "$lib/lifekids/data/settings/prize.svelte";

export const doorprize = $state({
  display: 0,
  next: 0,
  interval: -1,

  get number() {
    return this.display
      .toString()
      .padStart(doorprizeSetting.ending.toString().length, "0");
  },

  playDoorprize() {
    if (this.interval === -1) {
      this.next =
        doorprizeSetting.starting +
        Math.round(Math.random() * (doorprizeSetting.difference + 1));
      console.log(`Next prize number: ${this.next}`);

      this.interval = setInterval(() => {
        this.display =
          doorprizeSetting.starting +
          Math.round(Math.random() * doorprizeSetting.difference);
      }, 50);
    } else {
      clearInterval(this.interval);
      this.display = this.display;
      this.interval = -1;
    }
  },
});
