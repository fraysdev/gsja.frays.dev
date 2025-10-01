<script lang="ts">
  import { doorprizeSetting } from "$lib/lifekids/data/settings/prize.svelte";
</script>

<div class="section-opt">
  <h2>Doorprize Range</h2>
  <div class="input-wrap">
    <div class="input">
      <label for="range-min">Minimal</label>
      <input
        type="number"
        name="range-min"
        id="range-min"
        bind:value={doorprizeSetting.starting}
      />
    </div>
    <div class="input">
      <label for="range-max">Maximum</label>
      <input
        type="number"
        name="range-max"
        id="range-max"
        bind:value={doorprizeSetting.ending}
      />
    </div>
  </div>
</div>
