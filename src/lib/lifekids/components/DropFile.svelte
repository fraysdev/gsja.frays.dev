<script lang="ts">
  import { background } from "$lib/lifekids/data/settings/background.svelte";
  import Icon from "@iconify/svelte";

  let inputFile: HTMLInputElement;
  let dropZone: HTMLLabelElement;

  let files: FileList | null = $state(null);
  let fileName = $state("");

  function handleImageFile() {
    if (files === null || files.length === 0) return;

    const file = files.item(0);
    if (file === null) return;

    background.setImageFile(file);
  }

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    if (!event.dataTransfer?.items) return;

    const files = [...event.dataTransfer?.items]
      .map((i) => i.getAsFile())
      .filter((f) => f !== null);
    if (files.length > 0) {
      background.setImageFile(files[0]);
      fileName = files[0].name;
    }
  }

  function windowDrop(event: DragEvent) {
    if (
      event.dataTransfer?.items &&
      [...event.dataTransfer?.items].some((item) => item.kind === "file")
    ) {
      event.preventDefault();
    }
  }

  function handleDragOver(event: DragEvent) {
    if (!event.dataTransfer?.items) return;

    const fileItems = [...event.dataTransfer?.items].filter(
      (item) => item.kind === "file"
    );
    if (fileItems.length > 0) {
      event.preventDefault();
      if (fileItems.some((item) => item.type.startsWith("image/"))) {
        event.dataTransfer.dropEffect = "copy";
      } else {
        event.dataTransfer.dropEffect = "none";
      }
    }
  }

  function windowDragOver(event: DragEvent) {
    if (!event.dataTransfer?.items) return;

    const fileItems = [...event.dataTransfer.items].filter(
      (item) => item.kind === "file"
    );
    if (fileItems.length > 0) {
      event.preventDefault();
      if (!dropZone.contains(event.target as Node)) {
        event.dataTransfer.dropEffect = "none";
      }
    }
  }
</script>

<svelte:window ondrop={windowDrop} ondragover={windowDragOver} />

<label
  for="file-browser"
  id="drop-background"
  class="file-label"
  ondrop={handleDrop}
  ondragover={handleDragOver}
  bind:this={dropZone}
>
  <Icon icon="ph:upload-simple-bold" class="upload-icon" width="2.5rem" />
  <p>Drop image here or click to browse file</p>
  {#if fileName}
    <p style="color: #072446;">Current file: {fileName}</p>
  {/if}

  <input
    type="file"
    accept="image/*"
    name="file-browser"
    id="file-browser"
    onchange={handleImageFile}
    bind:this={inputFile}
    bind:files
  />
</label>

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
    justify-content: center;
    align-items: center;

    text-align: start;
  }

  #drop-background p {
    margin: 0;
  }

  #drop-background p:first-child {
    font-weight: 500;
  }

  #file-browser {
    display: none;
  }
</style>
