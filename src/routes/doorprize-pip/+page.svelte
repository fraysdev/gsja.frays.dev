<!-- /doorprize/+page.svelte -->
<script lang='ts'>
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    let numbers: number[] = $state([]);

    onMount(() => {
      const channel = new BroadcastChannel('doorprize-pip');
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
    <div class="list">
        {#each numbers as n,i (i)}
            <div class="number">
                {n}
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
        background-color: #000000;
        position: relative;
        margin: 0;
        height: 100vh;
    }

    main {
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%, 0%);

        width: 90%;
        height: 13%;
        background-color: #ffdd00;
    }

    .list {
        height: 100%;
        padding-left: 13%;
        display: flex;
        align-items: center;
        gap: 10em;
    }

    .list > .number {
        font-size: 4em;
    }

    footer {
        position: absolute;
        bottom: 4px;
        right: 8px;
    }
</style>
