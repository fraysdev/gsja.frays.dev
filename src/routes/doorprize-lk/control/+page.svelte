<script lang='ts'>
    import { onMount } from 'svelte';

    let numbers: number[] = $state([]);
    let placeholder: number[] = $state([]);
    let input = $state("");

    let channel: BroadcastChannel;
    onMount(() => {
      if (numbers.length === 0) {
        forceRestart()
      }

      channel = new BroadcastChannel("doorprize-lk");
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

    function updateNumber(i: number) {
      numbers[i] = placeholder[i];
    }

    function resetNumber(i: number) {
      numbers[i] = 0;
    }

    function resetAll() {
      numbers = numbers.filter(_ => 0);
    }

    function forceRestart() {
      numbers = Array.from({ length: 13 }, () => 0);
      placeholder = Array.from({ length: 13 }, () => 0);
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
                    <input class="number" type="number" bind:value={placeholder[i]} />
                    <button onclick={() => updateNumber(i)}>Update</button>
                    <button class="danger" onclick={() => resetNumber(i)}>Reset</button>
                </div>
            {/each}
            <div class="reset">
                <button class="danger" onclick={resetAll}>Reset All</button>
                <button class="danger" onclick={forceRestart}>Force Restart</button>
            </div>
        </div>
    </main>
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

    .list .entry,
    .list .reset {
        padding: .7rem 1rem;
        display: flex;
        align-items: center;

        display: flex;
        gap: 1em;
    }

    .list .entry > .number {
        /*font-size: 1.5em;*/
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
