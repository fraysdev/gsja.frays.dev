<script lang="ts">
  import Icon from "@iconify/svelte";

  let helpPopup = $state(false);

  function showHelp(event: KeyboardEvent) {
    if (["?"].includes(event.key.toLowerCase())) {
      event.preventDefault();
      helpPopup = !helpPopup;
    }
  }
</script>

<svelte:window onkeydown={showHelp} />

<div id="help-overlay" class={`${helpPopup ? "visible" : ""}`}>
  <div id="help">
    <div id="help-head">
      <div id="help-title">
        <Icon icon="ph:question-mark-bold" />
        <div>Help</div>
      </div>
    </div>
    <div id="help-body">
      <p>
        Untuk menjalankan <i>doorprize</i>, tekan <kbd>Space</kbd>.
        Memberhentikan doorprize pun cukup tekan <kbd>Space</kbd> lagi.
      </p>

      <p>
        Pengaturan (<i>Setting</i>) dapat dimunculkan dengan menekan
        <kbd>S</kbd>
        pada
        <i>keyboard</i>.
      </p>

      <p>
        Untuk mengetahui <i>keyboard shortcut</i> lainnya, cukup menekan
        <kbd>/</kbd> atau menuju bagian "Shortcut" pada Setting.
      </p>
    </div>
  </div>
</div>

<style>
  #help-overlay {
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

  #help-overlay.visible {
    visibility: visible;
  }

  #help {
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

  #help-head {
    background-color: #ebebeb;
    padding: 8px;

    display: flex;
    gap: 8px;
  }

  #help-head > #help-title {
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

  #help-body {
    overflow-y: scroll;
    padding: 16px;
  }

  p {
    margin-top: 0;
  }
</style>
