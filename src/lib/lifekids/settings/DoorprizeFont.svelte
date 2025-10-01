<script lang="ts">
  import { fontSetting } from "$lib/lifekids/data/settings/font.svelte";
</script>

<div class="section-opt">
  <h2>Doorprize Font</h2>
  <div class="input-wrap">
    <div class="input">
      <label for="font-size">Size</label>
      <input
        type="number"
        name="font-size"
        id="font-size"
        bind:value={fontSetting.size}
      />
    </div>
    <div class="input">
      <div class="color-wrapper">
        <div class="color-input">
          <label for="font-color">Color</label>
          <input
            type="text"
            name="font-color"
            id="font-color"
            bind:value={fontSetting.color}
          />
        </div>
        <div class="color-picker">
          <input
            type="color"
            name="font-color-picker"
            id="font-color-picker"
            bind:value={fontSetting.color}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .color-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .color-wrapper > .color-input {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .color-wrapper > .color-picker input[type="color"]::-webkit-color-swatch {
    padding: 0;
    border: 1px solid #e7e7e7;
    border-radius: 8px;
  }
</style>
