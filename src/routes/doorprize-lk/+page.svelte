<!-- /doorprize/+page.svelte -->
<script lang='ts'>
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    let numbers: number[] = $state([]);

    let fstRow = $derived([ numbers[0], numbers[1], numbers[2], numbers[3], numbers[4] ]);
    let sndRow = $derived([ numbers[5], numbers[6], numbers[7] ]);
    let thdRow = $derived([ numbers[8], numbers[9] ]);
    let lstRow = $derived([ numbers[10], numbers[11], numbers[12] ]);

    onMount(() => {
      const channel = new BroadcastChannel('doorprize-lk');
      channel.onmessage = (e) => {
        if (e.data.type == 'STATE') numbers = e.data.numbers;
      }

      channel.postMessage({ type: 'REQUEST_STATE' });
      return () => channel.close();
    });

    function openControl() {
        const base = page.url.pathname.replace(/\/$/, ''); // drop trailing slash
        window.open(`${base}/control`, 'doorprizeControl', 'popup,width=420,height=720');
    }

    function toggleFullscreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
    }
</script>

  <!-- ondblclick={() => document.documentElement.requestFullscreen()} -->
<main>
    <div class="lnum fstrow">
        {#each fstRow as n,i (i)}
            <div class="number">
                {String(n).padStart(4, '0')}
            </div>
        {/each}
    </div>
    <div class="lnum sndrow">
        {#each sndRow as n,i (i)}
            <div class="number">
                {String(n).padStart(4, '0')}
            </div>
        {/each}
    </div>
    <div class="lnum thdrow">
        {#each thdRow as n,i (i)}
            <div class="number">
                {String(n).padStart(4, '0')}
            </div>
        {/each}
    </div>
    <div class="lnum lstrow">
        {#each lstRow as n,i (i)}
            <div class="number">
                {String(n).padStart(4, '0')}
            </div>
        {/each}
    </div>
</main>

<footer class="toolbar">
    <button onclick={openControl}>Controller</button>
    <button onclick={toggleFullscreen}>Fullscreen</button>
</footer>

<style>
    :global(body) {
        background-image: url("/bg-doorprize.png");
        background-color: #000000;
        position: relative;
        margin: 0;
        height: 100vh;
    }

    main {
        width: 52%;
        height: 100%;
        /*padding-top: 2%;*/

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /*background-color: #ffdd00;*/
    }

    main > div {
        display: flex;
        align-items: center;
        gap: 2em;
    }

    main > .lstrow {
        flex-direction: column;
        justify-content: center;
        gap: 0;
    }

    .list {
        height: 100%;
        padding-left: 20%;

        display: grid;
        grid-template-rows: repeat(5, auto);  /* max 5 per column */
        grid-auto-flow: column;  /* fill down first, then move to next column */
        align-content: center;
        /*justify-content: center;*/
        gap: 2em;
    }

    .list {
        height: 100%;
        padding-left: 20%;

        display: grid;
        grid-template-rows: repeat(5, auto);  /* max 5 per column */
        grid-auto-flow: column;  /* fill down first, then move to next column */
        align-content: center;
        /*justify-content: center;*/
        gap: 2em;
    }

    .list > :nth-child(11) {
      grid-row-start: 3;
    }

    .lnum > .number {
        font-weight: 600;
        font-size: 5em;
    }

    footer {
        position: absolute;
        bottom: 4px;
        right: 8px;
    }
</style>
