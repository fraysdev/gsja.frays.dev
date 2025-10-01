<script lang="ts">
  import { background } from "$lib/lifekids/data/settings/background.svelte";
  import PrizeNumber from "$lib/lifekids/PrizeNumber.svelte";
  import Shortcut from "$lib/lifekids/Shortcut.svelte";
  import Setting from "$lib/lifekids/Setting.svelte";
  import Help from "$lib/lifekids/Help.svelte";
  import { onMount } from "svelte";

  let embedVisible = $state(true);

  onMount(() => {
    setTimeout(() => (embedVisible = false), 2000);
  });
</script>

<div
  id="app"
  style={`background-image: ${background.getImageUrlStyle()}; box-shadow: inset 0 0 0 1000px ${background.getOverlayRgba()};`}
>
  <PrizeNumber />

  <!-- Popup Components -->
  <Shortcut />
  <Setting />
  <Help />

  <!-- Shortcut Information -->
  <div id="embed-info" class={`${embedVisible ? "visible" : ""}`}>
    Tekan <kbd>?</kbd> untuk informasi lebih lanjut!
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  #app {
    background-size: cover;
    position: relative;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #embed-info {
    position: absolute;
    bottom: 16px;
    right: 16px;
    opacity: 0;

    transition: opacity 1s ease-out;
  }

  #embed-info.visible {
    opacity: 1;
  }
</style>
