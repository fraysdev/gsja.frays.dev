<script lang="ts">
  import Prize from "$lib/lifekids/components/settings/Prize.svelte";
  import Background from "$lib/lifekids/components/settings/Background.svelte";
  import Shortcut from "$lib/lifekids/components/settings/Shortcut.svelte";
  import Help from "$lib/lifekids/components/settings/Help.svelte";
  import Icon from "@iconify/svelte";

  let settingPopup = $state(false);
  let settingOpt = $state("prize");

  function showSetting(event: KeyboardEvent) {
    if (["s"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      settingOpt = "prize";
      settingPopup = !settingPopup;
    } else if (["?"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      settingOpt = "help";
      settingPopup = !settingPopup;
    } else if (["/"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      settingOpt = "shortcut";
      settingPopup = !settingPopup;
    }
  }
</script>

<svelte:window onkeydown={showSetting} />

<div id="setting-overlay" class={`${settingPopup ? "visible" : ""}`}>
  <div id="setting">
    <div id="setting-head">
      <button
        class={`option ${settingOpt === "prize" ? "selected" : ""}`}
        onclick={() => (settingOpt = "prize")}
      >
        <Icon icon="ph:hash-bold" />
        <div>Prize</div></button
      >
      <button
        class={`option ${settingOpt === "appearance" ? "selected" : ""}`}
        onclick={() => (settingOpt = "appearance")}
      >
        <Icon icon="ph:paint-brush-broad-bold" />
        <div>Appearance</div></button
      >
      <button
        class={`option ${settingOpt === "shortcut" ? "selected" : ""}`}
        onclick={() => (settingOpt = "shortcut")}
      >
        <Icon icon="ph:key-return-bold" />
        <div>Shortcut</div></button
      >
      <button
        class={`option ${settingOpt === "help" ? "selected" : ""}`}
        onclick={() => (settingOpt = "help")}
      >
        <Icon icon="ph:question-mark-bold" />
        <div>Help</div></button
      >
    </div>
    <div id="setting-body">
      {#if settingOpt === "prize"}
        <Prize />
      {:else if settingOpt === "appearance"}
        <Background />
      {:else if settingOpt === "shortcut"}
        <Shortcut />
      {:else if settingOpt === "help"}
        <Help />
      {:else}
        <p>Wth?</p>
      {/if}
    </div>
  </div>
</div>

<style>
  #setting-overlay {
    background-color: #00000010;
    visibility: hidden;
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  #setting-overlay.visible {
    visibility: visible;
  }

  #setting {
    background-color: #fafafa;
    box-shadow: 0 0 10px 1px #00000060;
    border-radius: 16px;
    overflow: hidden;
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
    overflow: scroll;
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

  #setting-body > :global(.section-opt .input-wrap > .input:not(:last-child)) {
    border-bottom: 1px solid #e7e7e7;
  }

  #setting-body > :global(.section-opt .input) {
    padding: 8px;
  }

  #setting-body > :global(.section-opt .input > label) {
    display: block;
    font-size: 0.8em;
    font-weight: 500;
  }

  #setting-body > :global(.section-opt .input > input) {
    background-color: transparent;
    padding: 0;
    outline: 0;
    border: 0;

    font-size: 1em;
    font-weight: 500;
  }
</style>
