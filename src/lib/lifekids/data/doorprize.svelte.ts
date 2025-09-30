import { prizeSetting } from "$lib/lifekids/data/settings/prize.svelte";

let prizeNumber = $state(0);
let prizeConfig = $state({ number: 0, interval: -1 });

export function runRandomizeNumber() {
  if (prizeConfig.interval === -1) {
    prizeNumber =
      prizeSetting.rangeMin +
      Math.round(Math.random() * (prizeSetting.diff + 1));
    console.log(`Next prize number: ${prizeNumber}`);

    prizeConfig.interval = setInterval(() => {
      prizeConfig.number =
        prizeSetting.rangeMin + Math.round(Math.random() * prizeSetting.diff);
    }, 50);
  } else {
    clearInterval(prizeConfig.interval);
    prizeConfig = {
      number: prizeNumber,
      interval: -1,
    };
  }
}

export const prizeDisplay = {
  get number() {
    return prizeConfig.number
      .toString()
      .padStart(prizeSetting.rangeMax.toString().length, "0");
  },
};
