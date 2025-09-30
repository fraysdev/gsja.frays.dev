<script lang="ts">
  import { prizeSetting } from "$lib/lifekids/data/settings/prize.svelte";
</script>

<div class="section-opt">
  <h2>Prize Range Number</h2>
  <div class="input-wrap">
    <div class="input">
      <label for="range-min">Minimal</label>
      <input
        type="number"
        name="range-min"
        id="range-min"
        bind:value={prizeSetting.rangeMin}
      />
    </div>
    <div class="input">
      <label for="range-max">Maximum</label>
      <input
        type="number"
        name="range-max"
        id="range-max"
        bind:value={prizeSetting.rangeMax}
      />
    </div>
  </div>
</div>
