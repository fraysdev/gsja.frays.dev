<script lang="ts">
  import { doorprize } from "./data/doorprize.svelte";
  import { fontSetting } from "./data/settings/font.svelte";

  function runDoorprize(event: KeyboardEvent) {
    if ([" ", "spacebar", "space"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      doorprize.playDoorprize();
    }
  }
</script>

<svelte:window onkeydown={runDoorprize} />

<div
  id="prize-num"
  style={`font-size: ${fontSetting.size}rem; color: ${fontSetting.color};`}
>
  {doorprize.number}
</div>

<style>
  #prize-num {
    font-family: "DM Mono", monospace;
    font-weight: 600;
    font-style: normal;
    font-size: 6rem;
  }
</style>
