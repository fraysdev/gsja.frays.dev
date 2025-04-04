<svelte:head>
    <title>Doorprize LIFEKids | gsja.frays.dev</title>
    <meta name="description" content="Doorprize LIFEKids! Menampilkan sebuah RNG (Random Number Generated; Nomor Acak) yang digunakan sebagai nomor undian doorprize pada acara besar LIFEKids GSJA Betlehem. Tema yang digunakan merujuk pada Paskah LIFEKids 2025.">
    <link rel="shortcut icon" href="/lifekids.png" type="image/x-icon">
</svelte:head>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

{@render children()}