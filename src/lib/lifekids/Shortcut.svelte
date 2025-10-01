<script lang="ts">
  import Icon from "@iconify/svelte";

  let shortcutPopup = $state(false);

  function showShortcut(event: KeyboardEvent) {
    if (["/"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      shortcutPopup = !shortcutPopup;
    }
  }
</script>

<svelte:window onkeydown={showShortcut} />

<div id="shortcut-overlay" class={`${shortcutPopup ? "visible" : ""}`}>
  <div id="shortcut">
    <div id="shortcut-head">
      <div id="shortcut-title">
        <Icon icon="ph:key-return-bold" />
        <div>Shortcut</div>
      </div>
    </div>
    <div id="shortcut-body">
      <div>
        <div>Run doorprize</div>
        <div><kbd>Space</kbd></div>

        <div>Setting</div>
        <div><kbd>S</kbd></div>

        <div>Show shortcut</div>
        <div><kbd>/</kbd></div>

        <div>Show help</div>
        <div><kbd>?</kbd></div>
      </div>
    </div>
  </div>
</div>

<style>
  #shortcut-overlay {
    background-color: #00000030;
    visibility: hidden;
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  #shortcut-overlay.visible {
    visibility: visible;
  }

  #shortcut {
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

  #shortcut-head {
    background-color: #ebebeb;
    padding: 8px;

    display: flex;
    gap: 8px;
  }

  #shortcut-head > #shortcut-title {
    background-color: transparent;
    border-radius: 8px;
    padding: 8px;
    border: 0px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    font-weight: 500;
    font-size: inherit;
  }

  #shortcut-body {
    overflow-y: scroll;
    padding: 16px;
  }

  #shortcut-body > div {
    display: grid;
    grid-template-columns: 1fr min-content;
    row-gap: 6px;
  }
</style>
