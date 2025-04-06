<div id=shortcut>
    <kbd id="key">{key}</kbd>

    {#if desc !== ""}
        <span id="desc">{desc}</span>
    {/if}
</div>

<style>
    #shortcut {
        display: flex;
        align-items: center;
        gap: .4em;

        font-family: "IBM Plex Mono", monospace;
        font-weight: 600;
        font-style: normal;
    }

    #key {
        background-color: white;
        box-shadow: 2px 2px 0 0 black;
        border: 1px solid black;
        padding: .1em .2em;
        min-width: .9em;
        text-align: center;
    }

    #desc {
        font-family: "Lexend", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
    }
</style>

<script>
	let { key, desc = "" } = $props();
</script>