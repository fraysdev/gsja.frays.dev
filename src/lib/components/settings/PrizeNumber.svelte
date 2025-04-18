<script lang="ts">
    import { fade } from "svelte/transition";

    // export let prizeRange = $state({ min: 1, max: 999 });
    let { prizeRange = $bindable() } = $props();
</script>

<div id="setting" transition:fade={{ duration: 400 }}>
    <div id="options">
        <div>
            <label for="prize-min">Minimum</label>
            <input type="number" name="prize-min" id="prize-min" class="inp-num" bind:value={prizeRange.min} />
        </div>
        <div>
            <label for="prize-max">Maximum</label>
            <input type="number" name="prize-max" id="prize-max" class="inp-num" bind:value={prizeRange.max} />
        </div>
    </div>

    <div id="title">
        Setting: Prize Number
    </div>
</div>

<style>
    /* Chrome, Safari, Edge, Opera */
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    /* Firefox */
    input[type="number"] {
        appearance: textfield;
        -moz-appearance: textfield;
    }

    input {
        width: 6em;
        border: 0;
        font-size: 1.4em;
    }

    input:focus {
        outline: 0;
    }

    #setting {
        margin: 1em;
        /* padding: 1em 0.8em; */
        width: max-content;

        background-color: white;
        border: 2px solid black;
        border-radius: .5em;
    }

    #setting > div {
        padding: .3em .5em;
    }

    #options {
        display: flex;
        gap: 1em;
    }

    #options div {
        display: flex;
        flex-direction: column;
    }

    #title {
        border-top: 2px solid black;
        font-weight: 600;
    }
</style>