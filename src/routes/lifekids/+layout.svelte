<svelte:head>
    <title>Doorprize LIFEKids | gsja.frays.dev</title>
    <meta name="description" content="Doorprize LIFEKids! Menampilkan sebuah RNG (Random Number Generated; Nomor Acak) yang digunakan sebagai nomor undian doorprize pada acara besar LIFEKids GSJA Betlehem. Tema yang digunakan merujuk pada Paskah LIFEKids 2025.">
    <link rel="shortcut icon" href="/lifekids.png" type="image/x-icon">
</svelte:head>

<style>
    :global(*) {
        font-family: "Lexend", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
    }
</style>

<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from '../lifekids/$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

{@render children()}