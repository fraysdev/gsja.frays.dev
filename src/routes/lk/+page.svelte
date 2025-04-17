<svelte:window onkeydown={shortcutHandler} />

<div id="app">
    {#if prizeRandom.interval === -1}
        <div id="prize-number">{prizeNumber.toString().padStart(prizeRange.max.toString().length, "0")}</div>
    {:else}
        <div id="prize-number">{prizeRandom.number.toString().padStart(3, "0")}</div>
    {/if}

    {#if !hideShortcut}
        <div id="shortcut" hidden={hideShortcut} aria-hidden={hideShortcut} transition:fade={{ duration: 300 }}>
            <Shortcut key="Space" desc="Run doorprize"/>
            <Shortcut key="S" desc="Open setting"/>
            <Shortcut key="Shift + /" desc="Open suprise"/>
            <Shortcut key="`" desc="Hide/show shortcut"/>
        </div>
    {/if}

    <RickRoll bind:dialog={rickRollDialog}>
        <img src="/dance-moves.gif" alt="A man dancing">
        <div>Haha, get rick rolled baby!</div>
    </RickRoll>

    <Setting bind:dialog={settingDialog} range={prizeRange} />
</div>

<!-- -+---+- Styles -+---+- -->
<style>
    :global(body) {
        margin: 0;
    }

    #app {
        height: 100vh;
        /* background-color: #f7f6fd; */
        background-image: url("/doorprize-lk.jpeg");
        background-size: cover;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #shortcut {
        position: absolute;
        right: 1vh;
        bottom: 1vh;

        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;
        gap: .8em;
    }

    #prize-number {
        font-family: "IBM Plex Mono", monospace;
        font-weight: 600;
        font-style: normal;
        font-size: 5em;
    }
</style>

<!-- -+---+- Scripts -+---+- -->
<script lang="ts">
    import { fade } from 'svelte/transition';
    import { range } from '$lib/scripts/numberRange';
    import type { Range } from '$lib/scripts/numberRange';
    import Shortcut from "$lib/components/Shortcut.svelte";
    import RickRoll from "$lib/components/RickRoll.svelte";
    import Setting from '$lib/components/Setting.svelte';
    import { browser } from "$app/environment";

    let rickRollDialog: HTMLDialogElement|undefined = $state();
    let settingDialog: HTMLDialogElement|undefined = $state();

    interface PrizeRandom {
        number: number,
        interval: number,
    }

    let hideShortcut = $state(false);

    let prizeRange = $state<Range>({ min: 1, max: 999 })
    let prizeNumber = $state(0);
    let prizeRandom = $state<PrizeRandom>({ 
        number: 0,
        interval: -1,
    });

    function randomizeNumber() {
        if (prizeRandom.interval === -1) {
            // Add one to eliminate prize number of 0
            prizeNumber = prizeRange.min + Math.round(Math.random() * prizeRange.max);
            console.log(`Next prize number is ${prizeNumber}`)

            prizeRandom.interval = setInterval(() => {
                prizeRandom.number = Math.round(Math.random() * 1000);
            }, 50)
        } else {
            clearInterval(prizeRandom.interval);
            prizeRandom.interval = -1;
        }
    }

    function shortcutHandler(event: KeyboardEvent) {
        // console.log({
        //     code: event.code,
        //     ctrl: event.ctrlKey,
        //     shift: event.shiftKey,
        //     alt: event.altKey,
        //     meta: event.metaKey,
        // });

        if (event.code === "Space") {
            randomizeNumber();
        } else if (event.shiftKey && event.code === "Slash") {
            if (!rickRollDialog) return;

            if (rickRollDialog.open) {
                rickRollDialog.close();
            } else {
                rickRollDialog.showModal()
            }
        } else if (event.code === "KeyS") {
            if (!settingDialog) return;

            if (settingDialog.open) {
                settingDialog.close();
            } else {
                settingDialog.showModal()
            }
        } else if (event.code === "Backquote") {
            hideShortcut = !hideShortcut;
        }
    }

    setTimeout(() => {
        hideShortcut = true;
    }, 5000)

    range.subscribe((v) => {
        if (browser) return (prizeRange = v)
    })
</script>
