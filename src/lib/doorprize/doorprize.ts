export const CHANNEL_ID = "doorprize";

export const STATUS = {
  IDLE: 'IDLE',
  ROLLING: 'ROLLING',
  STOPPED: 'STOPPED'
} as const;
export type Status = (typeof STATUS)[keyof typeof STATUS];

export function defaultState() {
  return {
    status: STATUS.IDLE as Status,
    min: 0,
    max: 100,
    count: 5,
    numbers: [0, 0, 0, 0, 0],
    history: [] as number[],

    bgColor: 'antiquewhite',
    bgImage: '',
    textColor: '#ffffff',
    fontSize: 10,
    pad: -1,              // Zero padding on number. Default -1 -- floor(log10(max))
  }
}

export type DoorprizeState = ReturnType<typeof defaultState>;

export function numberPadding(n: number, stateData: DoorprizeState) {
  return String(n).padStart(
    stateData.pad === -1
      ? Math.floor(Math.log10(stateData.max)) + 1
      : stateData.pad,
    '0'
  )
}

export function randomInt(n: number) {
  const limit = Math.floor(2 ** 32 / n) * n;

  let x;
  do {
    x = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (x >= limit);

  return x % n;
}
