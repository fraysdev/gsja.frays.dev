<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>Home | gsja.frays.dev</title>
  <meta
    name="description"
    content="Welcome to gsja.frays.dev! This subdomain used for project related to GSJA only!"
  />
  <meta name="author" content="FrankyRayMS" />
  <meta name="keywords" content="website, gsja, gsja betlehem, lifekids" />
  <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
</svelte:head>

{@render children()}
