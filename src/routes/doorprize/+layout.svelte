<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Doorprize | gsja.frays.dev/lifekids</title>
</svelte:head>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Iosevka+Charon+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

    :global(input), :global(button) {
        background-color: white;
        border: 2px solid #101010;
        box-shadow: 2px 2px black;
        padding: 4px 8px;

        font-family: "Iosevka Charon Mono", monospace;
        font-size: 1em;
        transition:
            transform .1s,
            box-shadow .1s;
    }

    :global(input) {
        box-sizing: border-box;
        width: 100%;
    }

    :global(input::-webkit-outer-spin-button),
    :global(input::-webkit-inner-spin-button) {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }

    :global(input:focus) {
        outline: 0;
    }

    :global(button) {
        box-sizing: border-box;
        margin: 2px;
    }

    :global(button:hover) {
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px black;
    }

    :global(button:active) {
        transform: translate(0, 0);
        box-shadow: 2px 2px black;
    }

    :global(button.danger) {
        background-color: #f77777;
    }
</style>

{@render children()}
