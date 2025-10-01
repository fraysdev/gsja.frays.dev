<script lang="ts">
  import { background } from "$lib/lifekids/data/settings/background.svelte";

  let inputFile: HTMLInputElement;
  let files = $state<FileList | null>(null);

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
    <button id="drop-background" onclick={() => inputFile.click()} tabindex={0}>
      <label for="file-browser" class="file-label">
        <p>Background</p>
        <p>Drop image here or click to browse file</p>
      </label>
      <input
        type="file"
        accept="image/*"
        name="file-browser"
        id="file-browser"
        onchange={handleImageFile}
        bind:this={inputFile}
        bind:files
      />
    </button>
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
  #drop-background {
    background-color: transparent;
    overflow: hidden;
    cursor: pointer;
    height: 8rem;
    padding: 8px;
    width: 100%;
    border: 0;

    display: flex;
    flex-direction: column;

    text-align: start;
  }

  #file-browser {
    display: none;
  }

  .file-label p {
    margin: 0;
  }

  .file-label p:first-child {
    font-weight: 500;
  }

  .file-label p:last-child {
    color: #505050;
  }

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
