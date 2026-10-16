<script lang='ts'>
    import { onMount } from 'svelte';

    let numbers: number[] = $state([]);
    let input = $state("");

    let channel: BroadcastChannel;
    onMount(() => {
      channel = new BroadcastChannel("doorprize-pip");
      channel.onmessage = (e) => {
        if (e.data.type === 'REQUEST_STATE') {
          channel.postMessage({ type: 'STATE', numbers: $state.snapshot(numbers) });
        }
      }

      return () => channel.close();
    });

    $effect(() => {
      channel?.postMessage({ type: 'STATE', numbers: $state.snapshot(numbers) });
    })

    function removeNumber(n: number) {
      numbers = numbers.filter(h => h !== n);
    }

    function broadcast() {const num = parseInt(input);
      if (isNaN(num) || numbers.includes(num)) return;
      numbers = [...numbers, num];
    }
</script>

<div class="screen">
    <main class="showing">
        <div class="title">Broadcast Number</div>

        <div class="list">
            {#each numbers as n,i (i)}
                <div class="entry">
                    <span class="number">{n}</span>
                    <button onclick={() => removeNumber(n)}>X</button>
                </div>
            {/each}
        </div>
    </main>
    <aside class="broadcast">
        <div class="title">Input</div>
        <input class="number" type="text" bind:value={input} />
        <button onclick={broadcast}>Broadcast</button>
    </aside>
</div>

<style>
    .screen {
        height: 100vh;
        display: grid;
        grid-template-rows: 1fr auto;

        font-family: "Iosevka Charon Mono", monospace;
        background-color: antiquewhite;
        color: #000000;
    }

    main > .title, aside {
        padding: .7rem 1rem;
    }

    .list .entry {
        padding: .7rem 1rem;
        display: flex;
        align-items: center;
    }

    .list .entry > .number {
        font-size: 1.5em;
        flex: 1;
    }

    aside, .list > *:nth-child(odd) {
        background-color: #00000010;
    }

    aside > * {
        margin-bottom: .3em;
    }

    aside > input {
        font-size: 1.5em;
        height: 2em;
    }

    .title {
        font-weight: 600;
        font-size: 1.3em;
    }
</style>
