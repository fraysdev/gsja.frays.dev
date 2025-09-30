<script lang="ts">
  import { prizeDisplay, runRandomizeNumber } from "./data/doorprize.svelte";

  function runDoorprize(event: KeyboardEvent) {
    if ([" ", "spacebar", "space"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      runRandomizeNumber();
    }
  }
</script>

<svelte:window onkeydown={runDoorprize} />

<div id="prize-num">
  {prizeDisplay.number}
</div>

<style>
  #prize-num {
    font-family: "DM Mono", monospace;
    font-weight: 600;
    font-style: normal;
    font-size: 6rem;
  }
</style>
