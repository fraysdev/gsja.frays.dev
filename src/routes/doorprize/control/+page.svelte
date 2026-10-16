<!-- /doorprize/control/+page.svelte -->
<script lang='ts'>
  import { onMount } from 'svelte';
  import { CHANNEL_ID, defaultState, randomInt, STATUS } from '$lib/doorprize/doorprize';

  const STORAGE_KEY = "doorprize-state"
  let stateData = $state(defaultState());
  let channel: BroadcastChannel;

  const isRolling = $derived(stateData.status === STATUS.ROLLING);
  let buttonStatus = $derived.by(() => {
    if (isRolling) return { tx: 'Stop', cl: '#c77777' };
    return { tx: 'Start', cl: '#77c777' };
  });

  const freeCount = $derived.by(() => {
    const { min, max, history } = stateData;
    if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) return 0;
    const used = history.filter((n) => n >= min && n <= max).length;
    return max - min + 1 - used;
  });

  onMount(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const stateSaved = { ...defaultState(), ...JSON.parse(saved) };
      if (stateSaved.status === 'ROLLING') stateSaved.status = 'IDLE';

      stateData = stateSaved;
    }

    channel = new BroadcastChannel(CHANNEL_ID);
    channel.onmessage = (e) => {
      if (e.data.type === 'REQUEST_STATE') {
        channel.postMessage({ type: 'STATE', state: $state.snapshot(stateData) });
      }
    }

    return () => channel.close();
  });

  $effect(() => {
    const snap = $state.snapshot(stateData);
    channel?.postMessage({ type: 'STATE', state: snap });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
  })

  $effect(() => {
    if (stateData.status !== STATUS.IDLE) return;

    const slots = Math.max(1, Math.floor(stateData.count) || 1);
    if (stateData.numbers.length !== slots) {
      stateData.numbers = Array.from({ length: slots }, (_, i) => stateData.numbers[i] ?? 0);
    }
  });

  function toggleRoll() {
    if (!isRolling) {
      if (freeCount === 0) return;           // nothing left to draw
      stateData.status = STATUS.ROLLING;
      return;
    }

    // --- STOP: draw the final numbers ---
    const { min, max } = stateData;
    const count = Math.max(1, Math.floor(stateData.count) || 1);
    const want = Math.min(count, freeCount);   // never ask for more than what's left

    const newNumbers: number[] = [];
    while (newNumbers.length < want) {
      const n = min + randomInt(max - min + 1);
      if (!newNumbers.includes(n) && !stateData.history.includes(n)) {
        newNumbers.push(n);
      }
    }

    stateData.numbers = newNumbers;
    stateData.history.push(...newNumbers);
    stateData.status = STATUS.STOPPED;
  }

  function resetDefault() {
    stateData = defaultState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(stateData)));
  }
</script>

<div class="screen">
    <main>
        <button
            class="shuffle"
            style:background-color={buttonStatus.cl}
            disabled={!isRolling && freeCount === 0}
            onclick={toggleRoll}>
                {buttonStatus.tx}
        </button>
    </main>

    <aside>
        <div>
            Configuration (coming soon!)
        </div>

        <div>
            <div>Multi-number</div>
            <input type="number" bind:value={stateData.count} disabled={isRolling} />
        </div>

        <button class:danger={true} onclick={resetDefault}>
            Reset default
        </button>
    </aside>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Iosevka+Charon+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

    .screen {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr 40%;

        font-family: "Iosevka Charon Mono", monospace;
        background-color: antiquewhite;
        color: #000000;
    }

    main {
        /*background-color: #f1f0f0;*/
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    aside {
        background-color: #00000010;
        padding: 1rem;
    }

    aside > * {
        margin-bottom: .5em;
    }

    input, button {
        background-color: white;
        border: 2px solid #101010;
        box-shadow: 2px 2px black;
        padding: 4px 8px;

        font-family: "Iosevka Charon Mono", monospace;
        font-size: 1em;
        transition:
            transform .1s,
            box-shadow .1s;
    }

    input {
        box-sizing: border-box;
        width: 100%;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }

    input:focus {
        outline: 0;
    }

    button {
        box-sizing: border-box;
        margin: 2px;
    }

    button:hover {
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px black;
    }

    button:active {
        transform: translate(0, 0);
        box-shadow: 2px 2px black;
    }

    button.danger {
        background-color: #f77777;
    }

    .shuffle {
        aspect-ratio: 4/2;
        border: 2px solid #101010;
        box-shadow: 2px 2px black;
        width: 80%;

        font-size: 2.5em;
        font-weight: 600;
        transition:
            transform .1s,
            box-shadow .1s;
    }
</style>
