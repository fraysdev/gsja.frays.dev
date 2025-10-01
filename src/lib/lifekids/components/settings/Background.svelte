<script lang="ts">
  import { background } from "$lib/lifekids/data/background.svelte";

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
  <div id="drop-background">
    <span>
      Drop image here or
      <button id="file-browser-btn" onclick={() => inputFile.click()}
        >Browser File</button
      >
    </span>
    <input
      type="file"
      accept="image/*"
      name="file-browser"
      id="file-browser"
      onchange={handleImageFile}
      bind:this={inputFile}
      bind:files
    />
  </div>
</div>

<style>
  #drop-background {
    border: 1px solid #e7e7e7;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    padding: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  #file-browser-btn {
    background-color: #3584e3;
    border-radius: 4px;
    border: 0;
    padding: 4px 6px;

    font-size: inherit;
    color: white;
  }

  #file-browser {
    display: none;
  }
</style>
