<script lang="ts">
  import PrizeNumber from "$lib/lifekids/PrizeNumber.svelte";
  import Setting from "$lib/lifekids/Setting.svelte";
</script>

<div id="app">
  <PrizeNumber />
  <Setting />
</div>

<style>
  :global(body) {
    margin: 0;
  }

  #app {
    position: relative;
    height: 100vh;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
