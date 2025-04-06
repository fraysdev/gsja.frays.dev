<dialog bind:this={dialog}>
    <h1>Setting</h1>

    <div>
        <label for="min-range">Hello world</label>
        <input id="min-range" bind:value={range.min} type="number">
    </div>
    <input id="min-range" bind:value={range.max} type="number">
</dialog>

<style>
    dialog {
        background-color: transparent;
        border: 0 solid black;

        display: flexbox;
        justify-content: center;
        
        font-family: "Lexend", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal; 
        font-size: 1.2em;
        color: white;
    }

    dialog:focus {
        outline: none;
    }

    dialog::backdrop {
        background-color: black;
        opacity: 0.25;
    }
</style>

<script lang="ts">
    let { dialog = $bindable(), range } = $props();
</script>