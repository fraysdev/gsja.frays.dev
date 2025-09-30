<script lang="ts">
  import { page } from "$app/state";
</script>

<div id="app">
  <h1>Error Page</h1>
  <p><code>{page.status}</code>: {page.error?.message}</p>
</div>

<!-- -+---+- Styles -+---+- -->
<style>
  :global(body) {
    margin: 0;
  }

  #app {
    height: 100vh;
    background-color: antiquewhite;

    font-family: "Lexend", sans-serif;
    font-optical-sizing: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  code {
    font-family: "IBM Plex Mono", monospace;
    font-weight: 600;
    font-style: normal;
  }

  h1,
  p {
    margin: 0 0;
  }
</style>
