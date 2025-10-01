<script lang="ts">
  import DoorprizeRange from "$lib/lifekids/settings/DoorprizeRange.svelte";
  import DoorprizeFont from "$lib/lifekids/settings/DoorprizeFont.svelte";
  import Background from "$lib/lifekids/settings/Background.svelte";

  import Icon from "@iconify/svelte";

  let settingPopup = $state(false);
  let settingOpt = $state("prize");

  function showSetting(event: KeyboardEvent) {
    if (["s"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      settingOpt = "prize";
      settingPopup = !settingPopup;
    }
  }
</script>

<svelte:window onkeydown={showSetting} />

{#snippet buttonOption(name: string, id: string, icon: string)}
  <button
    class={`option ${settingOpt === id ? "selected" : ""}`}
    onclick={() => (settingOpt = id)}
  >
    <Icon {icon} />
    <div>{name}</div></button
  >
{/snippet}

<div id="setting-overlay" class={`${settingPopup ? "visible" : ""}`}>
  <div id="setting">
    <div id="setting-head">
      {@render buttonOption("Prize", "prize", "ph:chart-polar-bold")}
      {@render buttonOption("Background", "background", "ph:image-bold")}
    </div>
    <div id="setting-body">
      {#if settingOpt === "prize"}
        <DoorprizeRange />
        <DoorprizeFont />
      {:else if settingOpt === "background"}
        <Background />
      {:else}
        <p>Wth?</p>
      {/if}
    </div>
  </div>
</div>

<style>
  #setting-overlay {
    /* background-color: #00000010; */
    visibility: hidden;
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: end;
  }

  #setting-overlay.visible {
    visibility: visible;
  }

  #setting {
    background-color: #fafafa;
    box-shadow: 0 0 10px 1px #00000060;
    border-radius: 16px;
    overflow: hidden;
    margin: 16px;
    height: 40%;
    width: 40%;

    display: grid;
    grid-template-rows: min-content 1fr;
  }

  #setting-head {
    background-color: #ebebeb;
    padding: 8px;

    display: flex;
    justify-content: center;
    gap: 8px;
  }

  #setting-head > button.option {
    background-color: transparent;
    border-radius: 8px;
    padding: 8px;
    border: 0px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    font-weight: 500;
    font-size: inherit;
  }

  #setting-head > button.option:hover {
    background-color: #e0e0e0;
  }

  #setting-head > button.option.selected {
    background-color: #d8d8d8;
  }

  #setting-body {
    overflow-y: scroll;
    padding: 16px;
  }

  #setting-body > :global(*:not(:last-child)) {
    margin-bottom: 16px;
  }

  #setting-body > :global(.section-desc) {
    color: #5f5f5f;
  }

  #setting-body > :global(.section-opt > h2) {
    font-size: 1rem;
    margin: 0 0 8px 0;
  }

  #setting-body > :global(.section-opt .input-wrap) {
    border: 1px solid #e7e7e7;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
  }

  #setting-body > :global(.section-opt .input-wrap > *:not(:last-child)) {
    border-bottom: 1px solid #e7e7e7;
  }

  #setting-body > :global(.section-opt .input) {
    padding: 8px;
  }

  #setting-body > :global(.section-opt .input label) {
    display: block;
    font-size: 0.8em;
    font-weight: 500;
  }

  #setting-body > :global(.section-opt .input input) {
    background-color: transparent;
    padding: 0;
    outline: 0;
    border: 0;

    font-size: 1em;
    font-weight: 500;
  }
</style>
