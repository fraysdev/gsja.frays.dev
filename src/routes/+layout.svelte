<svelte:head>
    <title>Home | gsja.frays.dev</title>
    <link rel="shortcut icon" href="/favicon.png" type="image/x-icon">
</svelte:head>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import '$lib/styles/fonts.css';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

{@render children()}