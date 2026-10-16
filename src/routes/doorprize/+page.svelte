<!-- /doorprize/+page.svelte -->
<script lang='ts'>
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import { CHANNEL_ID, STATUS, defaultState, numberPadding } from '$lib/doorprize/doorprize';

    let stateData = $state(defaultState());
    let flicker: number[] = $state([]);
    let isFullscreen = $state(false);

    onMount(() => {
      const channel = new BroadcastChannel(CHANNEL_ID);
      channel.onmessage = (e) => {
        if (e.data.type == 'STATE') stateData = e.data.state;
      }

      channel.postMessage({ type: 'REQUEST_STATE' });
      return () => channel.close();
    });

    $effect(() => {
      if (stateData.status !== STATUS.ROLLING) return;

      const { min, max } = stateData;
      const slots = Math.max(1, Math.floor(stateData.count) || 1);

      const roll = () => {
        flicker = Array.from(
          { length: slots },
          () => min + Math.floor(Math.random() * (max - min + 1))
        );
      };

      roll();
      const id = setInterval(roll, 50);
      return () => clearInterval(id);
    });

    const shown = $derived(
      (stateData.status === STATUS.ROLLING ? flicker : stateData.numbers)
        .map((n) => numberPadding(n, stateData))
    );

    function openControl() {
        const base = page.url.pathname.replace(/\/$/, ''); // drop trailing slash
        window.open(`${base}/control`, 'doorprizeControl', 'popup,width=920,height=480');
    }

    function toggleFullscreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
    }
</script>

  <!-- ondblclick={() => document.documentElement.requestFullscreen()} -->
<div
    class="screen"
    style:background-color={stateData.bgColor}
    style:background-image={stateData.bgImage ? `url(${stateData.bgImage})` : 'none'}
    style:color={stateData.textColor}
>
    <div class="number" style:font-size="{stateData.fontSize}vmin">
        {#each shown as n, i (i)}
            <div>{n}</div>
        {/each}
    </div>

    <div class="toolbar">
        <button onclick={openControl}>Controller</button>
        <button onclick={toggleFullscreen}>Fullscreen</button>
    </div>
</div>

<style>
    :global(body) { margin: 0; }

    button {
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

    .screen {
        height: 100vh;
        display: grid;
        place-items: center;
        background-size: cover;
        background-position: center;
    }

    .number {
        font-weight: 800;
        font-variant-numeric: tabular-nums;
        color: black;
    }

    .toolbar {
        position: fixed;
        bottom: 8px;
        right: 8px;
    }
</style>
