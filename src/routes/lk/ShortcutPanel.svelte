<dialog bind:this={dialog} on:close>
    <slot/>
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
        background-image: linear-gradient(
            45deg,
            magenta,
            rebeccapurple,
            dodgerblue,
            green
        );
        opacity: 0.75;
    }
</style>

<script lang="ts">
    export let dialog;
</script>