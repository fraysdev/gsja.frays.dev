<script lang="ts">
  import DropFile from "$lib/lifekids/components/DropFile.svelte";
  import { background } from "$lib/lifekids/data/settings/background.svelte";
  import Icon from "@iconify/svelte";

  let inputFile: HTMLInputElement;
  let files: FileList | null = $state(null);

  function handleImageFile() {
    if (files === null || files.length === 0) return;

    const file = files.item(0);
    if (file === null) return;

    background.setImageFile(file);
  }
</script>

<div class="section-opt">
  <h2>Background</h2>
  <div class="input-wrap">
    <DropFile />
    <div class="input">
      <label for="overlay-opacity">Overlay Opacity (%)</label>
      <input
        type="number"
        name="overlay-opacity"
        id="overlay-opacity"
        bind:value={background._overlayOpacity}
      />
    </div>
    <div class="input">
      <div class="color-wrapper">
        <div class="color-input">
          <label for="font-color">Overlay Color</label>
          <input
            type="text"
            name="overlay-color"
            id="overlay-color"
            bind:value={background.overlayColor}
          />
        </div>
        <div class="color-picker">
          <input
            type="color"
            name="overlay-color-picker"
            id="overlay-color-picker"
            bind:value={background.overlayColor}
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
