<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "../lifekids/$types";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Doorprize LIFEKids | gsja.frays.dev</title>
  <meta
    name="description"
    content="Doorprize LIFEKids! Menampilkan sebuah RNG (Random Number Generated)"
  />
  <link rel="shortcut icon" href="/lifekids.png" type="image/x-icon" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Outfit:wght@100..900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children()}

<style>
  :global(*) {
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    /* font-weight: <weight>; */
    font-style: normal;
  }

  :global(input::-webkit-outer-spin-button),
  :global(input::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
  }

  :global(input[type="number"]) {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  :global(kbd) {
    background-color: #f0f0f0;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding: 0 4px;
    font-family: "DM Mono", monospace;
  }
</style>
