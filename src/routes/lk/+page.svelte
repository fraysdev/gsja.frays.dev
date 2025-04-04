<svelte:window onkeydown={shortcutHandler} />

<div id="app">
    {#if prizeRandom.interval === -1}
        <div id="prize-number">{prizeNumber.toString().padStart(3, "0")}</div>
    {:else}
        <div id="prize-number">{prizeRandom.number.toString().padStart(3, "0")}</div>
    {/if}

    {#if !hideShortcut}
        <div id="shortcut" hidden={hideShortcut} aria-hidden={hideShortcut} transition:fade={{ duration: 300 }}>
            <Shortcut key="Space" desc="Run doorprize"/>
            <Shortcut key="Shift + /" desc="Open shortcut panel"/>
            <Shortcut key="`" desc="Hide/show shortcut"/>
        </div>
    {/if}

    <ShortcutPanel bind:dialog>
        <img src="/dance-moves.gif" alt="A man dancing">
        <div>Haha, get rick rolled baby!</div>
    </ShortcutPanel>
</div>

<!-- -+---+- Styles -+---+- -->
<style>
    :global(body) {
        margin: 0;
    }

    #app {
        height: 100vh;
        background-color: antiquewhite;
        
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
    import { onMount } from 'svelte';
    import ShortcutPanel from "./ShortcutPanel.svelte";
    import Shortcut from "./Shortcut.svelte";

    let dialog: HTMLDialogElement;

    interface PrizeRandom {
        number: number,
        interval: number,
    }

    let hideShortcut = $state(false);

    let prizeNumber = $state(0);
    let prizeRandom = $state<PrizeRandom>({ 
        number: 0,
        interval: -1,
    });

    function randomizeNumber() {
        if (prizeRandom.interval === -1) {
            // Add one to eliminate prize number of 0
            prizeNumber = 1 + Math.round(Math.random() * 1000);
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
            if (dialog.open) {
                dialog.close();
            } else {
                dialog.showModal()
            }
        } else if (event.code === "Backquote") {
            hideShortcut = !hideShortcut;
        }
    }

    setTimeout(() => {
        hideShortcut = true;
    }, 5000)
</script>
