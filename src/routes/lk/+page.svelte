<script lang="ts">
    import { MoveRight } from '@lucide/svelte';
    import type { PageData } from './$types';
    import { redirect } from '@sveltejs/kit';
  import { onMount } from 'svelte';

    // // Redirect this route to /hello
    // export function load() {
    //     throw redirect(302, '/hello');
    // }
    
    onMount(() => {
        setTimeout(() => {
            throw redirect(302, '/lifekids');
        }, 2000)
    })

    let { data }: { data: PageData } = $props();
</script>

<div id="app">
    <h1>Page has been moved!</h1>
    <p>Moved to <a href="/lifekids"><code>gsja.frays.dev/lifekids</code></a></p>
    <div class="redirect">
        <a href="/lifekids"><MoveRight /></a>
    </div>
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

    .redirect {
        margin-top: 1em;
    }

    code {
        font-family: "IBM Plex Mono", monospace;
        font-weight: 600;
        font-style: normal;
    }

    h1, p {
        margin: 0 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>