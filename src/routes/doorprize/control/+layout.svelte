<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Doorprize Control | gsja.frays.dev/lifekids</title>
</svelte:head>

{@render children()}
